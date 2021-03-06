using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.UserImages
{
  public class Add
  {
    public class Command : IRequest<UserPhoto>
    {
      public IFormFile File { get; set; }
    }
    public class Handler : IRequestHandler<Command, UserPhoto>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      private readonly IPhotoAccessor _photoAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
      {
        _photoAccessor = photoAccessor;
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<UserPhoto> Handle(Command request, CancellationToken cancellationToken)
      {
        var photoUploadResult = _photoAccessor.AddPhoto(request.File);

        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

        var photo = new UserPhoto
        {
          Url = photoUploadResult.Url,
          Id = photoUploadResult.PublicId
        };

        if (!user.UserPhotos.Any(x => x.IsMain))
        {
          photo.IsMain = true;
        }
        user.UserPhotos.Add(photo);

        var success = await _context.SaveChangesAsync();

        return success > 0 ? photo : throw new Exception("Problem saving changes");
      }
    }
  }
}