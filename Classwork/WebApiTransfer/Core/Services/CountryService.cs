using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location.Country;
using Domain;
using Domain.Entities.Location;
using Microsoft.EntityFrameworkCore;
using System;

namespace Core.Services;

public class CountryService(IMapper mapper,
    AppDbTransferContext context,
    IImageService imageService) : ICountryService
{
    public async Task<CityItemModel> CreateAsync(CountryCreateModel model)
    {
        var entity = mapper.Map<CountryEntity>(model);
        if (model.Image != null)
        {
            entity.Image = await imageService.UploadImageAsync(model.Image);
        }
        await context.Countries.AddAsync(entity);
        await context.SaveChangesAsync();
        var item = mapper.Map<CityItemModel>(entity);
        return item;
    }


    public async Task<List<CityItemModel>> GetListAsync()
    {
        var query = context.Countries;
        var list = await query
            .Where(x => !x.IsDeleted)
            .ProjectTo<CityItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        return list;
    }

    public async Task<CityItemModel> EditAsync(CountryEditModel model)
    {
        var entity = await context.Countries.FindAsync(model.Id);

        if (entity == null || entity.IsDeleted)
        {
            throw new Exception("Країна не знайдена");
        }

        mapper.Map(model, entity);

        if (model.Image != null)
        {
            if (!string.IsNullOrEmpty(entity.Image))
            {
                imageService.DeleteImage(entity.Image);
            }
            entity.Image = await imageService.UploadImageAsync(model.Image);
        }

        await context.SaveChangesAsync();

        var item = mapper.Map<CityItemModel>(entity);
        return item;
    }
    public async Task DeleteAsync(int id)
    {
        var entity = await context.Countries.FindAsync(id);

        if (entity != null)
        {
            entity.IsDeleted = true;
            await context.SaveChangesAsync();
        }
    }
}
