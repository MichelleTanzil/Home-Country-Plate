using System;
using System.Collections.Generic;

namespace Application.Products
{
  public class ProductDto
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public float Price { get; set; }
    public ICollection<ProductDto> Likes { get; set; }
  }
}