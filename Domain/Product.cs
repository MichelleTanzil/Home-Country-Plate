using System;

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
  }
}