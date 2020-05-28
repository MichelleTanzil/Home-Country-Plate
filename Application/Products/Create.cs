using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Image { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public string City { get; set; }
      public string State { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var newProduct = new Product
        {
          Id = request.Id,
          Title = request.Title,
          Image = request.Image,
          Description = request.Description,
          Category = request.Category,
          City = request.City,
          State = request.State
        };

        _context.Products.Add(newProduct);

        var success = await _context.SaveChangesAsync();

        return success > 0 ? Unit.Value : throw new Exception("Problem saving changes");
      }
    }
  }
}