using System;
using System.Threading.Tasks;
using Application.UserCart;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class CartController : BaseController {
        [HttpGet]
        public async Task<ActionResult<CartDTO>> Details () {
            return await Mediator.Send (new Details.Query ());
        }

        [HttpPost ("{id}")]
        public async Task<ActionResult<Unit>> Create (Guid id, int quantity) {
            return await Mediator.Send (new Add.Command {ProductId = id, Quantity = quantity});
        }
    }
}