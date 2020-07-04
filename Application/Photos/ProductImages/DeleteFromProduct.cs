using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Photos.ProductImages
{
  public class DeleteFromProduct
  {
    public class Command : IRequest
    {
      public Guid ProductId { get; set; }
      public string PhotoId { get; set; }
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
        var product = await _context.Products.FindAsync(request.ProductId);

        if (product == null)
          throw new RestException(HttpStatusCode.NotFound, new { product = "Not Found" });

        var photo = product.ProductPhotos.FirstOrDefault(x => x.Id == request.PhotoId);

        if (photo == null)
          throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });

        if (photo.IsMain)
          throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo" });

        var result = _photoAccessor.DeletePhoto(photo.Id);

        if (result == null)
          throw new Exception("Problem deleting photo");

        product.ProductPhotos.Remove(photo);

        var success = await _context.SaveChangesAsync();

        return success > 0 ? Unit.Value : throw new Exception("Problem saving changes");
      }
    }
  }
}