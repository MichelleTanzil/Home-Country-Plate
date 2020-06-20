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
    }
  }
}