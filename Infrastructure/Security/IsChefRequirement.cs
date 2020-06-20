using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
  public class IsChefRequirement : IAuthorizationRequirement
  {

  }
  public class IsChefRequirementHandler : AuthorizationHandler<IsChefRequirement>
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _context;
    public IsChefRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
      _context = context;
      _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsChefRequirement requirement)

    {
      var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

      var productId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

      var product = _context.Products.FindAsync(productId).Result;

      var chef = product.UserProducts.FirstOrDefault(x => x.IsChef);

      if (chef?.AppUser.UserName == currentUserName)
        context.Succeed(requirement);

      return Task.CompletedTask;
    }
  }
}