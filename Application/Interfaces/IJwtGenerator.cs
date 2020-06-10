using Domain;

namespace Application.Interfaces {
    public interface IJwtGenerator {
        string CreateToken (AppUser user); // when we pass this method a user we can expect to get back a string which is our JWT token
    }
}