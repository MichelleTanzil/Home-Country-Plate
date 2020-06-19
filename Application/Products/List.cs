using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
  public class List
  {
    public class Query : IRequest<List<Product>> { }
    public class Handler : IRequestHandler<Query, List<Product>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
      {
        var products = await _context.Products
          .Include(x => x.UserProducts)
          .ThenInclude(x => x.AppUser)
          .ToListAsync();
        return products;
      }
    }
  }
}