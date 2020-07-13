using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Stripe;

namespace Application.UserCart {
    public class Checkout {
        public class Command : IRequest<string> {
        }
        public class Handler : IRequestHandler<Command, string> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<string> Handle (Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                if (user.UserCart == null) {
                    throw new RestException (HttpStatusCode.MethodNotAllowed, new { Cart = "Cannot checkout" });
                }
                Dictionary<string, string> Metadata = new Dictionary<string, string>();

                foreach (var item in user.UserCart.ItemsInCart)
                {
                    Metadata.Add("Product", item.Title);
                    Metadata.Add("Quantity", item.quantity.ToString());
                }

                var options = new PaymentIntentCreateOptions{
                    Amount = (long)user.UserCart.Total*100,
                    Currency = "USD",
                    Description = "Purchace from Home County Plate",
                    ReceiptEmail = user.Email,
                    Metadata = Metadata
                };

                var service = new PaymentIntentService();
                var charge = service.Create(options);

                return charge.ClientSecret;
            }
        }
    }

}