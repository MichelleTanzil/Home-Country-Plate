using System;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
  public class PhotoAccessor : IPhotoAccessor
  {
    private readonly Cloudinary _cloudinary;
    public PhotoAccessor(IOptions<CloudinarySettings> config) //allows us to access user secrets and is strongly typed
    {
      var acc = new Account(
        config.Value.CloudName,
        config.Value.ApiKey,
        config.Value.ApiSecret
      );

      _cloudinary = new Cloudinary(acc);
    }

    public PhotoUploadResult AddPhoto(IFormFile file)
    {
      var uploadResult = new ImageUploadResult();
      if (file.Length > 0)
      {
        using (var stream = file.OpenReadStream())
        {
          var uploadParams = new ImageUploadParams
          {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
          };
          uploadResult = _cloudinary.Upload(uploadParams);
        }
      }

      if (uploadResult.Error != null)
        throw new Exception(uploadResult.Error.Message);

      return new PhotoUploadResult
      {
        PublicId = uploadResult.PublicId,
        Url = uploadResult.SecureUrl.AbsoluteUri
      };
    }

    public string DeletePhoto(string publicId)
    {
      throw new System.NotImplementedException();
    }
  }
}