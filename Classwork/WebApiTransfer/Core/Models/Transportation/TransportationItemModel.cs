namespace Core.Models.Transportation;


/// <summary>
/// Модель, що описує окремий транспортний рейс
/// для відображення у списках
/// та результатах пошуку.
/// </summary>
public class TransportationItemModel
{
    /// <summary>
    /// Унікальний ідентифікатор рейсу або перевезення.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Унікальний код рейсу або ідентифікатор перевезення.
    /// Використовується для ідентифікації рейсу в системі.
    /// </summary>
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// Назва міста відправлення.
    /// </summary>
    public string FromCityName { get; set; } = string.Empty;

    /// <summary>
    /// Назва країни відправлення.
    /// </summary>
    public string FromCountryName { get; set; } = string.Empty;

    /// <summary>
    /// Назва міста прибуття.
    /// </summary>
    public string ToCityName { get; set; } = string.Empty;

    /// <summary>
    /// Назва країни прибуття.
    /// </summary>
    public string ToCountryName { get; set; } = string.Empty;

    /// <summary>
    /// Дата та час відправлення рейсу.
    /// Значення передається у строковому форматі
    /// (наприклад, ISO 8601) для зручності відображення на фронтенді.
    /// </summary>
    public string DepartureTime { get; set; } = string.Empty;

    /// <summary>
    /// Дата та час прибуття рейсу.
    /// Значення передається у строковому форматі
    /// (наприклад, ISO 8601) для зручності відображення на фронтенді.
    /// </summary>
    public string ArrivalTime { get; set; } = string.Empty;

    /// <summary>
    /// Загальна кількість пасажирських місць у транспорті.
    /// </summary>
    public int SeatsTotal { get; set; }

    /// <summary>
    /// Кількість доступних (ще не зайнятих) місць на рейсі.
    /// </summary>
    public int SeatsAvailable { get; set; }

    /// <summary>
    /// Поточний статус рейсу.
    /// Може приймати такі значення:
    /// - Запланований
    /// - Затримується
    /// - Скасований
    /// - Виконаний
    /// - Немає вільних місць
    /// </summary>
    public string StatusName { get; set; } = string.Empty;
}

