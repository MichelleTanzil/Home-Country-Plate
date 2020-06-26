using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserCart {
    public class Add {
        public class Command : IRequest {
            public Guid Id { get; set; }
            public Guid ProductId { get; set; }
            public int Quantity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator () {
                RuleFor (x => x.Quantity).GreaterThan (0);
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
                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                var product = await _context.Products.FindAsync(request.ProductId);
                if (user.UserCart.ItemsInCart.Count == 0) { // If there are no items in the cart we create a new cart item
                    var cartItem = new CartItem {
                    product = product,
                    quantity = request.Quantity
                    };

                    float cartSum = (request.Quantity * product.Price);

                    var cart = new Cart {
                        Id = request.Id,
                        AppUser = user,
                        Total = cartSum
                    };

                    _context.UserCart.Add (cart);
                } else { // if there are items in the cart
                    if (user.UserCart.ItemsInCart.Any (x => x.product == product)) { // if the same item already exist
                        var ItemInCart = user.UserCart.ItemsInCart.FirstOrDefault (x => x.product == product);
                        ItemInCart.quantity = request.Quantity;
                    } else {
                        var cartItem = new CartItem { // if product not yet in cart, create and add it
                            product = product,
                            quantity = request.Quantity
                        };

                        user.UserCart.ItemsInCart.Add(cartItem);
                    }
                }

                var success = await _context.SaveChangesAsync ();

                return success > 0 ? Unit.Value : throw new Exception ("Problem saving changes");
            }
        }
    }
}