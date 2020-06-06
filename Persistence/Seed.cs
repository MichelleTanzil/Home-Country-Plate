using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {
        public static async Task SeedData (DataContext context, UserManager<AppUser> userManager) { // changed to async because usermanager creating async
            if (!userManager.Users.Any ()) {
                var users = new List<AppUser> {
                    new AppUser {
                    DisplayName = "Admin",
                    UserName = "admin",
                    Email = "admin@admin.com"
                    },
                    new AppUser {
                    DisplayName = "Nadia",
                    UserName = "nadia",
                    Email = "nadia@nadia.com"
                    },
                    new AppUser {
                    DisplayName = "Michelle",
                    UserName = "michelle",
                    Email = "michelle@michelle.com"
                    }
                };

                foreach (var user in users) {
                    await userManager.CreateAsync (user, "ASDasd123#");
                }
            };

            if (!context.Products.Any ()) {
                var products = new List<Product> {
                    new Product {
                    Title = "Sushi",
                    Description = "Japanese Sushi",
                    Category = "Japanese",
                    City = "Torrance",
                    State = "CA",
                    Price = 10.15f
                    },
                    new Product {
                    Title = "Pizza",
                    Description = "Italian Pizza",
                    Category = "Italian",
                    City = "Los Angeles",
                    State = "CA",
                    Price = 5.10f
                    },
                    new Product {
                    Title = "Hotpot",
                    Description = "Chinese Hotpot",
                    Category = "Hotpot",
                    City = "Lake Forest",
                    State = "CA",
                    Price = 21.5f
                    },
                    new Product {
                    Title = "Boba",
                    Description = "Taiwanese Boba",
                    Category = "Drink",
                    City = "Irvine",
                    State = "CA",
                    Price = 8
                    },
                    new Product {
                    Title = "Burrito",
                    Description = "Mexican Burrito",
                    Category = "Mexican",
                    City = "Santa Ana",
                    State = "CA",
                    Price = 5
                    },
                };

                context.Products.AddRange (products);
                context.SaveChanges ();
            }
        }
    }
}