using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
  public class Details
  {
    public class Query : IRequest<ProductDto>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, ProductDto>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<ProductDto> Handle(Query request, CancellationToken cancellationToken)
      {
        var product = await _context.Products
          .Include(x => x.UserProducts)
          .ThenInclude(x => x.AppUser)
          .SingleOrDefaultAsync(x => x.Id == request.Id);
        if (product == null)
          throw new RestException(HttpStatusCode.NotFound, new { product = "Not Found" });
        return new ProductDto
        {

        };
      }
    }
  }
}