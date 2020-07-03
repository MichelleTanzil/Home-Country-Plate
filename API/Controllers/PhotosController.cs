using System;
using System.Threading.Tasks;
using Application.Photos.ProductImages;
using Application.Photos.UserImages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class PhotosController : BaseController
  {
    [HttpPost("user")]
    public async Task<ActionResult<Photo>> AddToUser([FromForm] Add.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("user/{id}")]

    public async Task<ActionResult<Unit>> Delete(string id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }

    [HttpPost("user/{id}/setmain")]
    public async Task<ActionResult<Unit>> SetMain(string id)
    {
      return await Mediator.Send(new SetMain.Command { Id = id });
    }

    [HttpPost("product/{id}")]
    public async Task<ActionResult<Unit>> AddToProduct([FromForm] AddToProduct.Command command, string id)
    {
      return await Mediator.Send(new AddToProduct.Command { Id = id });
    }
  }
}