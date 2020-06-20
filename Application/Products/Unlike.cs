using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
  public class Unlike
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var product = await _context.Products.FindAsync(request.Id);

        if (product == null)
          throw new RestException(HttpStatusCode.NotFound, new { Product = "Could not find product" });

        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

        if (user == null)
          throw new RestException(HttpStatusCode.NotFound, new { AppUser = "User is not logged in" });

        var liked = await _context.UserProducts
          .SingleOrDefaultAsync(x => x.ProductId == product.Id && x.AppUserId == user.Id);

        if (liked == null)
          return Unit.Value;

        if (liked.IsChef)
          throw new RestException(HttpStatusCode.BadRequest, new { liked = "You cannot remove yourself as chef" });

        _context.UserProducts.Remove(liked);

        var success = await _context.SaveChangesAsync();
        return success > 0 ? Unit.Value : throw new Exception("Problem saving changes");
      }
    }
  }
}