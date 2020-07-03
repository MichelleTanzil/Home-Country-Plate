using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos.ProductImages
{
  public class AddToProduct
  {
    public class Command : IRequest
    {
      public IFormFile File { get; set; }
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IPhotoAccessor _photoAccessor;
      public Handler(DataContext context, IPhotoAccessor photoAccessor)
      {
        _photoAccessor = photoAccessor;
        _context = context;
      }
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var photoUploadResult = _photoAccessor.AddPhoto(request.File);

        var product = await _context.Products.FindAsync(request.Id);

        if (product == null)
          throw new RestException(HttpStatusCode.NotFound, new { product = "Not Found" });

        var photo = new Photo
        {
          Url = photoUploadResult.Url,
          Id = photoUploadResult.PublicId
        };

        if (product.ProductPhotos.Any(x => x.IsMain))
        {
          photo.IsMain = true;
        }

        product.ProductPhotos.Add(photo);

        var success = await _context.SaveChangesAsync();

        return success > 0 ? Unit.Value : throw new Exception("Problem saving changes");
      }
    }
  }
}
