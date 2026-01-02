using AutoMapper;
using Core.Models.Location.Country;
using Domain.Entities.Location;

namespace Core.Mappers;

public class CountryMapper : Profile
{
    public CountryMapper()
    {
        CreateMap<CountryEntity, CityItemModel>();

        CreateMap<CountryCreateModel, CountryEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore());

        CreateMap<CountryEditModel, CountryEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore());
    }
}
