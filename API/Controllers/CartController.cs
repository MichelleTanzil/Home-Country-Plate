using System;
using System.Threading.Tasks;
using Application.UserCart;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class CartController : BaseController {
        [HttpGet ("{id}")]
        public async Task<ActionResult<CartDTO>> Details (Guid id) {
            return await Mediator.Send (new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Add.Command command) {
            return await Mediator.Send (command);
        }
    }
}