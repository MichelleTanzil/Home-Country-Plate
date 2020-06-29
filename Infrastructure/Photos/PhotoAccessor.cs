using Application.Interfaces;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Photos
{
  public class PhotoAccessor : IPhotoAccessor
  {
    public PhotoUploadResult AddPhoto(IFormFile File)
    {
      throw new System.NotImplementedException();
    }

    public string DeletePhoto(string publicId)
    {
      throw new System.NotImplementedException();
    }
  }
}