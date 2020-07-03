using System.Threading.Tasks;
using Application.ProductImages.Photos;
using Application.UserImages.Photos;
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

    [HttpPost("product")]
    public async Task<ActionResult<Photo>> AddToProduct([FromForm] AddToProduct.Command command)
    {
      return await Mediator.Send(command);
    }
  }
}