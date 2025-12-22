using Core.Models.Location.Country;

namespace Core.Interfaces;

public interface ICountryService
{
    Task<List<CityItemModel>> GetListAsync();
    Task<CityItemModel> CreateAsync(CountryCreateModel model);
    Task<CityItemModel> EditAsync(CountryEditModel model);
    Task DeleteAsync(int id);
}
