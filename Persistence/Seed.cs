using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
  public class Seed
  {
    public static void SeedData(DataContext context)
    {
      if (!context.Products.Any())
      {
        var products = new List<Product>
        {
          new Product
          {
            Title="Sushi",
            Description="Japanese Sushi",
            Category="Japanese",
            City="Torrance",
            State = "CA",
          },
          new Product
          {
            Title="Pizza",
            Description="Italian Pizza",
            Category="Italian",
            City="Los Angeles",
            State = "CA",
          },
          new Product
          {
            Title="Hotpot",
            Description="Chinese Hotpot",
            Category="Hotpot",
            City="Lake Forest",
            State = "CA",
          },
          new Product
          {
            Title="Boba",
            Description="Taiwanese Boba",
            Category="Drink",
            City="Irvine",
            State = "CA",
          },
          new Product
          {
            Title="Burrito",
            Description="Mexican Burrito",
            Category="Mexican",
            City="Santa Ana",
            State = "CA",
          },
        };

        context.Products.AddRange(products);
        context.SaveChanges();
      }
    }
  }
}