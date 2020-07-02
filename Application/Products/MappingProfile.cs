using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Products
{
  public class MappingProfile : Profile

  {
    public MappingProfile()
    {
      CreateMap<Product, ProductDto>();
      CreateMap<UserProduct, LikesDto>()
        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.UserPhotos.FirstOrDefault(x => x.IsMain).Url));
    }
  }
}