using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products {
    public class Details {
        public class Query : IRequest<Product> {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Product> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Product> Handle (Query request, CancellationToken cancellationToken) {
                var product = await _context.Products.FindAsync (request.Id);
                if (product == null)
                    throw new RestException (HttpStatusCode.NotFound, new { product = "Not Found" });
                return product;
            }
        }
    }
}