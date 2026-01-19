using AutoMapper;
using Core.Models.Account;
using Domain.Entities.Identity;
using Google.Apis.Auth;

namespace Core.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<GoogleJsonWebSignature.Payload, UserEntity>()
            .ForMember(u => u.UserName, opt => opt.MapFrom(p => p.Email))
            .ForMember(u => u.FirstName, opt => opt.MapFrom(p => p.GivenName))
            .ForMember(u => u.LastName, opt => opt.MapFrom(p => p.FamilyName))
            .ForMember(u => u.Image, opt => opt.MapFrom(p => p.Picture));

        CreateMap<UserEntity, UserProfileModel>()
            .ForMember(x => x.FullName, opt => opt.MapFrom(x => $"{x.LastName} ${x.FirstName}"))
            .ForMember(x => x.Phone, opt => opt.MapFrom(x => $"{x.PhoneNumber}"));

        CreateMap<UserEntity, UserItemModel>()
            .ForMember(x => x.FullName, opt => opt.MapFrom(x => $"{x.LastName} {x.FirstName}"))
            .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.UserRoles!.Select(ur => ur.Role.Name).ToList()));
    }
}
