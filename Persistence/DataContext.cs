using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options) { }
    public DbSet<Product> Products { get; set; }
    public DbSet<UserProduct> UserProducts { get; set; }
    public DbSet<Cart> UserCart { get; set; }
    public DbSet<Order> UserOrders { get; set; }

    public DbSet<UserPhoto> UserPhotos { get; set; }
    public DbSet<ProductPhoto> ProductPhotos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<UserProduct>(x => x.HasKey(ua => new { ua.AppUserId, ua.ProductId }));

      builder.Entity<UserProduct>()
      .HasOne(a => a.AppUser)
      .WithMany(up => up.UserProducts)
      .HasForeignKey(u => u.AppUserId);

      builder.Entity<UserProduct>()
      .HasOne(p => p.Product)
      .WithMany(up => up.UserProducts)
      .HasForeignKey(ap => ap.ProductId);

      builder.Entity<AppUser>()
      .HasOne(c => c.UserCart)
      .WithOne(p => p.AppUser)
      .HasForeignKey<Cart>(ap => ap.UserId);
    }
  }
}