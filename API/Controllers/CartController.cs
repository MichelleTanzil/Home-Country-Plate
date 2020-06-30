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

        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Add.Command command) {
            return await Mediator.Send (command);
        }
    }
}