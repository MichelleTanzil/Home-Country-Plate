using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserCart {
    public class Details {
        public class Query : IRequest<CartDTO> { }

        public class Handler : IRequestHandler<Query, CartDTO> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IUserAccessor userAccessor, IMapper mapper) {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<CartDTO> Handle (Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.Include(a => a.UserCart).ThenInclude(a => a.ItemsInCart).SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                var cart = user.UserCart;
                if (cart == null)
                    throw new RestException (HttpStatusCode.NotFound, new { cart = "Not found" });

                var cartToReturn = new CartDTO {
                    Id = cart.Id,
                    ItemsInCart = cart.ItemsInCart,
                    Total = cart.Total
                };

                return cartToReturn;
            }
        }
    }
}