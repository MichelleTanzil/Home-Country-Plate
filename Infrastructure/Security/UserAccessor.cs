using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security {
    public class UserAccessor : IUserAccessor {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor (IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;

        }

        public string GetCurrentUsername () {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault (x => x.Type == ClaimTypes.NameIdentifier)?.Value; // if the user objects exists, we access it's claims and search for the username and its values
            return username;
        }
    }
}