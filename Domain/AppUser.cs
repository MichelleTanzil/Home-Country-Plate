using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public virtual ICollection<UserProduct> UserProducts { get; set; }
    public virtual Cart UserCart { get; set; } // 1:1 relationship with the cart
    public virtual ICollection<UserPhoto> UserPhotos { get; set; } //1:m relationship with Photos
    public virtual ICollection<Order> UserOrders { get; set; }
  }
}