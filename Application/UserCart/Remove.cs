using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserCart {
    public class Remove {
        public class Command : IRequest {
            public Guid ProductId { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                var product = user.UserCart.ItemsInCart.FirstOrDefault (x => x.ProductId == request.ProductId);
                if (product != null)
                    user.UserCart.ItemsInCart.Remove (product);
                else throw new RestException (HttpStatusCode.NotFound, new { product = "Not Found" });

                var success = await _context.SaveChangesAsync ();

                return success > 0 ? Unit.Value : throw new Exception ("Problem saving changes");
            }
        }
    }
}