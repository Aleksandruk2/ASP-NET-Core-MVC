using Domain.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

/// <summary>
/// Сутність кошика користувача, що представляє вибраний
/// транспортний рейс та кількість заброньованих квитків.
///
/// Використовується для зв’язку між користувачем
/// (<see cref="UserEntity"/>) та транспортним рейсом
/// (<see cref="TransportationEntity"/>).
/// </summary>
[Table("tblCarts")]
public class CartEntity
{
    /// <summary>
    /// Ідентифікатор користувача, якому належить кошик.
    /// </summary>
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    /// <summary>
    /// Ідентифікатор транспортного рейсу,
    /// який доданий до кошика.
    /// </summary>
    [ForeignKey(nameof(Transportation))]
    public int TransportationId { get; set; }

    /// <summary>
    /// Кількість квитків, доданих до кошика
    /// для вибраного транспортного рейсу.
    /// </summary>
    public short CountTikets { get; set; }

    /// <summary>
    /// Навігаційна властивість користувача,
    /// якому належить поточний кошик.
    /// </summary>
    public virtual UserEntity? User { get; set; }

    /// <summary>
    /// Навігаційна властивість транспортного рейсу,
    /// доданого до кошика.
    /// </summary>
    public virtual TransportationEntity? Transportation { get; set; }
}
