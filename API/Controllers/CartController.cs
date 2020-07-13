using System;
using System.Threading.Tasks;
using Application.UserCart;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers {
    public class CartController : BaseController {
        [HttpGet]
        public async Task<ActionResult<CartDTO>> Details () {
            return await Mediator.Send (new Details.Query ());
        }

        [HttpPost ("{id}")]
        public async Task<ActionResult<Unit>> Create (Guid id, int quantity) {
            return await Mediator.Send (new Add.Command { ProductId = id, Quantity = quantity });
        }

        [HttpPost ("{id}/remove")]
        public async Task<ActionResult<Unit>> Remove (Guid id) {
            return await Mediator.Send (new Remove.Command { ProductId = id });

        }

        [HttpPost ("checkout")]
        public async Task<ActionResult<string>> Proccessing () {
            return await Mediator.Send (new Checkout.Command ());
        }
    }
}