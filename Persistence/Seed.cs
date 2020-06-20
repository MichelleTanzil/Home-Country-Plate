using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    { // changed to async because usermanager creating async
      if (!userManager.Users.Any())
      {
        var users = new List<AppUser> {
                    new AppUser {
                      Id = "a",
                      DisplayName = "Admin",
                      UserName = "admin",
                      Email = "admin@admin.com"
                    },
                    new AppUser {
                      Id = "b",
                      DisplayName = "Nadia",
                      UserName = "nadia",
                      Email = "nadia@nadia.com"
                    },
                    new AppUser {
                      Id = "c",
                      DisplayName = "Michelle",
                      UserName = "michelle",
                      Email = "michelle@michelle.com"
                    }
                };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "ASDasd123#");
        }
      };

      if (!context.Products.Any())
      {
        var products = new List<Product> {
                    new Product {
                    Title = "Sushi",
                    Description = "Japanese Sushi",
                    Category = "Japanese",
                    City = "Torrance",
                    State = "CA",
                    Price = 10.15f,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        }
                      }
                    },
                    new Product {
                    Title = "Pizza",
                    Description = "Italian Pizza",
                    Category = "Italian",
                    City = "Los Angeles",
                    State = "CA",
                    Price = 5.10f,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Hotpot",
                    Description = "Chinese Hotpot",
                    Category = "Hotpot",
                    City = "Lake Forest",
                    State = "CA",
                    Price = 21.5f,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Boba",
                    Description = "Taiwanese Boba",
                    Category = "Drink",
                    City = "Irvine",
                    State = "CA",
                    Price = 8,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Burrito",
                    Description = "Mexican Burrito",
                    Category = "Mexican",
                    City = "Santa Ana",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Meatball Sub",
                    Description = "American Meatball Sub",
                    Category = "American",
                    City = "Mission Viejo",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        },
                      }
                    },
                    new Product {
                    Title = "Chicken Wings",
                    Description = "American Chicken Wings",
                    Category = "American",
                    City = "Mission Viejo",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Lasanga",
                    Description = "Italian Lasanga",
                    Category = "Italian",
                    City = "Mission Viejo",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Steak",
                    Description = "American Steak",
                    Category = "American",
                    City = "Bunna Park",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Chicken Tikka Masala",
                    Description = "Indian Chicken Tikka Masala",
                    Category = "Indian",
                    City = "Santa Ana",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Tacos",
                    Description = "Mexican Tacos",
                    Category = "Mexican",
                    City = "Santa Ana",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "c",
                          IsChef = false,
                        },
                      }
                    },
                    new Product {
                    Title = "Apple Pie",
                    Description = "American Apple Pie",
                    Category = "American",
                    City = "Santa Ana",
                    State = "CA",
                    Price = 5,
                    UserProducts = new List<UserProduct>
                      {
                        new UserProduct
                        {
                          AppUserId = "b",
                          IsChef = true,
                        },
                        new UserProduct
                        {
                          AppUserId = "a",
                          IsChef = false,
                        },
                      }
                    },
                };

        context.Products.AddRange(products);
        context.SaveChanges();
      }
    }
  }
}