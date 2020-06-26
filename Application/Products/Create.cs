using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products {
  public class Create {
    public class Command : IRequest {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Image { get; set; }
      public float Price { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public string City { get; set; }
      public string State { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command> {
      public CommandValidator () {
        RuleFor (x => x.Title).NotEmpty ();
        RuleFor (x => x.City).NotEmpty ();
        RuleFor (x => x.Category).NotEmpty ();
        RuleFor (x => x.Price).NotEmpty ();
      }
    }
    public class Handler : IRequestHandler<Command> {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler (DataContext context, IUserAccessor userAccessor) {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
        var newProduct = new Product {
          Id = request.Id,
          Title = request.Title,
          Image = request.Image,
          Description = request.Description,
          Category = request.Category,
          City = request.City,
          State = request.State,
          Price = request.Price
        };

        _context.Products.Add (newProduct);

        var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

        var chef = new UserProduct {
          AppUser = user,
          Product = newProduct,
          IsChef = true,
        };

        _context.UserProducts.Add (chef);

        var success = await _context.SaveChangesAsync ();

        return success > 0 ? Unit.Value : throw new Exception ("Problem saving changes");
      }
    }
  }
}