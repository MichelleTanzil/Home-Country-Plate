using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
  public interface IPhotoAccessor
  {
    PhotoUploadResult AddPhoto(IFormFile File);

    string DeletePhoto(string publicId);
  }
}