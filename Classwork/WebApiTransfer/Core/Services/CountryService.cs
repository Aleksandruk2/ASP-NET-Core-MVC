using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location;
using Domain;
using Domain.Entities.Loacation;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CountryService(IMapper mapper,
    AppDbTransferContext context,
    IImageService imageService) : ICountryService
{
    public async Task<CountryItemModel> CreateAsync(CountryCreateModel model)
    {
        var entity = mapper.Map<CountryEntity>(model);
        if (model.Image != null)
        {
            entity.Image = await imageService.UploadImageAsync(model.Image);
        }
        await context.Countries.AddAsync(entity);
        await context.SaveChangesAsync();
        var item = mapper.Map<CountryItemModel>(entity);
        return item;
    }

    public async Task<List<CountryItemModel>> GetListAsync()
    {
        var query = context.Countries;
        var list = await query
            .ProjectTo<CountryItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        return list;
    }
}
