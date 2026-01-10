using Domain.Entities.Location;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

namespace Domain.Entities;

public class TransportationEntity : BaseEntity<int>
{
    /// <summary>
    /// Код перевезення - PS101, PS505
    /// </summary>
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// Звідки ми виїзджаємо
    /// </summary>
    [ForeignKey(nameof(FromCity))]
    public int FromCityId { get; set; }
    public CityEntity FromCity { get; set; } = null!;

    /// <summary>
    /// Куди ми приїзджаємо
    /// </summary>
    [ForeignKey(nameof(ToCity))]
    public int ToCityId { get; set; }
    public CityEntity ToCity { get; set; } = null!;

    /// <summary>
    /// Дата і час виїзду
    /// </summary>
    public DateTime DepartureTime { get; set; }

    /// <summary>
    /// Дата і час прибуття
    /// </summary>
    public DateTime ArrivalTime { get; set; }

    /// <summary>
    /// Загальна кількість мість
    /// </summary>
    public int SeatsTotal { get; set; }

    /// <summary>
    /// Кількість вільних (ще не зайнятих) мість
    /// </summary>
    public int SeatsAvailable { get; set; }

    /// <summary>
    /// В якому статусі знаходиться рейс -
    /// запланований
    /// затримується
    /// скасований
    /// виконаний
    /// виконується
    /// немає мість
    /// </summary>
    [ForeignKey(nameof(Status))]
    public int StatusId { get; set; }
    public TransportationStatusEntity Status { get; set; } = null!;
}

