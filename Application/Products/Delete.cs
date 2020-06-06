using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Products {
    public class Delete {
        public class Command : IRequest {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                //handler logic goes here
                var product = await _context.Products.FindAsync (request.Id);

                if (product == null)
                    throw new RestException (HttpStatusCode.NotFound, new { product = "Not Found" });

                _context.Remove (product);

                var success = await _context.SaveChangesAsync ();

                return success > 0 ? Unit.Value : throw new Exception ("Problem saving changes");
            }
        }
    }
}