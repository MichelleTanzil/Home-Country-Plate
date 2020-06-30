using System;
using System.Collections.Generic;

namespace Domain
{
  public class Product
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public float Price { get; set; }
    public virtual ICollection<UserProduct> UserProducts { get; set; }
    public virtual ICollection<Photo> ProductPhotos { get; set; } //1:m relationship with Photos

  }
}