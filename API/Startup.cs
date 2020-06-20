using System.Text;
using Application.Interfaces;
using Application.Products;
using API.Middleware;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using AutoMapper;

namespace API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
      });
      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
        {
          policy
              .AllowAnyHeader()
              .AllowAnyMethod()
              .WithOrigins("http://localhost:3000");
        });
      });
      services.AddMediatR(typeof(List.Handler).Assembly);
      // Automapper service to map many-to-many relationshios
      services.AddAutoMapper(typeof(List.Handler));
      services.AddControllers(opt =>
      { // To make any request to be dependent on user's JWT, uncomment the lines bellow
        // var policy = new AuthorizationPolicyBuilder ().RequireAuthenticatedUser ().Build (); // every request requires authenticated user
        // opt.Filters.Add (new AuthorizeFilter (policy));
      }).AddFluentValidation(cfg =>
      {
        cfg.RegisterValidatorsFromAssemblyContaining<Create>();
      });

      var builder = services.AddIdentityCore<AppUser>();
      var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
      identityBuilder.AddEntityFrameworkStores<DataContext>();
      identityBuilder.AddSignInManager<SignInManager<AppUser>>();

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
      {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = key,
          ValidateAudience = false,
          ValidateIssuer = false
        };
      });

      services.AddScoped<IJwtGenerator, JwtGenerator>(); //when we inject the inteface in our construcors of classes we weill have to have access to the methods within it. And when we use the methods we actually use the concrete one.
      services.AddScoped<IUserAccessor, UserAccessor>(); // now we can get the username everywhere in the app
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ErrorHandlingMiddleware>();
      if (env.IsDevelopment())
      {
        // app.UseDeveloperExceptionPage ();
      }
      else
      {
        app.UseHsts();
      }

      // app.UseHttpsRedirection();
      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseRouting();
      app.UseCors("CorsPolicy");

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}