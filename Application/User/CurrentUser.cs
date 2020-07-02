using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
  public class CurrentUser
  {
    public class Query : IRequest<User> { }
    public class Handler : IRequestHandler<Query, User>
    {
      private readonly UserManager<AppUser> _userManager;
      private readonly IJwtGenerator _jwtGenerator;
      private readonly IUserAccessor _userAccessor;
      public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _jwtGenerator = jwtGenerator;
        _userManager = userManager;
      }

      public async Task<User> Handle(Query request, CancellationToken cancellationToken)
      {
        try
        {
          var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
          return new User
          {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Token = _jwtGenerator.CreateToken(user),
            Image = user.UserPhotos.FirstOrDefault(x => x.IsMain)?.Url
          };
        }
        catch (System.Exception)
        {
          throw new RestException(HttpStatusCode.BadRequest, new { User = "User not found, try to login or register" });
        }
      }
    }
  }
}