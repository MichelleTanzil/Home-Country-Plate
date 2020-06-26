using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserCart {
    public class Details {
        public class Query : IRequest<CartDTO> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CartDTO> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CartDTO> Handle(Query request, CancellationToken cancellationToken){
                var cart = await _context.UserCart.FindAsync(request.Id);

                if(cart == null)
                    throw new RestException(HttpStatusCode.NotFound, new {cart = "Not found"});

                var cartToReturn = _mapper.Map<Cart, CartDTO>(cart);

                return cartToReturn;
            }
        }
    }
}