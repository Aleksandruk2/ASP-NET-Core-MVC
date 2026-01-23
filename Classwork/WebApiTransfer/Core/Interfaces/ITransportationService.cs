using Core.Models.Transportation;

namespace Core.Interfaces;

/// <summary>
/// Сервіс для роботи з транспортними рейсами.
/// Надає методи для отримання списків транспортних перевезень
/// з подальшим використанням у бізнес-логіці або API.
/// </summary>
public interface ITransportationService
{
    /// <summary>
    /// Отримує список транспортних рейсів у вигляді моделей
    /// для відображення або передачі на клієнт.
    /// </summary>
    /// <returns>
    /// Асинхронну операцію, що повертає колекцію транспортних рейсів
    /// у форматі <see cref="TransportationItemModel"/>.
    /// </returns>
    Task<List<TransportationItemModel>> GetTransportationsListAsync();
}

