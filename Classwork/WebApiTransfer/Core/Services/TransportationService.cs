using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Transportation;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <summary>
/// Реалізація сервісу для роботи з транспортними рейсами.
///
/// Для мапінгу сутностей у DTO використовується AutoMapper
/// з підтримкою проєкції на рівні запиту до бази даних.
/// </summary>
public class TransportationService(
    AppDbTransferContext context,
    IMapper mapper) : ITransportationService
{
    /// <summary>
    /// Асинхронно отримує список транспортних рейсів.
    /// Дані проєктуються безпосередньо з бази даних у
    /// <see cref="TransportationItemModel"/> за допомогою AutoMapper,
    /// що дозволяє уникнути завантаження зайвих полів у памʼять.
    /// </summary>
    /// <returns>
    /// Колекцію транспортних рейсів у вигляді
    /// <see cref="TransportationItemModel"/>.
    /// </returns>
    public async Task<List<TransportationItemModel>> GetTransportationsListAsync()
    {
        var result = await context.Transportations
            .ProjectTo<TransportationItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return result;
    }
}

