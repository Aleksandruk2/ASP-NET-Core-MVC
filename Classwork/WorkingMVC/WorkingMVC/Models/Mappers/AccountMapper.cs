using AutoMapper;
using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Models.Account;

namespace WorkingMVC.Models.Mappers;

public class AcconuntMapper : Profile
{
    public AcconuntMapper()
    {
        CreateMap<RegisterViewModel, UserEntity>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email))
            .ForMember(x => x.Image, opt => opt.Ignore());
    }
}
