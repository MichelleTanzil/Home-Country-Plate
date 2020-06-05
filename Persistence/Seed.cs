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

                foreach (AppUser user in users) {
                    await userManager.CreateAsync (user, "asdasdasd");
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
                    },
                    new Product {
                    Title = "Pizza",
                    Description = "Italian Pizza",
                    Category = "Italian",
                    City = "Los Angeles",
                    State = "CA",
                    },
                    new Product {
                    Title = "Hotpot",
                    Description = "Chinese Hotpot",
                    Category = "Hotpot",
                    City = "Lake Forest",
                    State = "CA",
                    },
                    new Product {
                    Title = "Boba",
                    Description = "Taiwanese Boba",
                    Category = "Drink",
                    City = "Irvine",
                    State = "CA",
                    },
                    new Product {
                    Title = "Burrito",
                    Description = "Mexican Burrito",
                    Category = "Mexican",
                    City = "Santa Ana",
                    State = "CA",
                    },
                };

                context.Products.AddRange (products);
                context.SaveChanges ();
            }
        }
    }
}