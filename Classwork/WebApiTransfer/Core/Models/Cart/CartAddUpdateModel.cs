namespace Core.Models.Cart;

/// <summary>
/// Модель запиту для додавання або оновлення позиції в кошику користувача.
/// </summary>
public class CartAddUpdateModel
{
    /// <summary>
    /// Ідентифікатор транспортного рейсу (перевезення),
    /// який додається до кошика або оновлюється.
    /// </summary>
    public int TransportationId { get; set; }

    /// <summary>
    /// Кількість квитків для обраного рейсу.
    /// Використовується як при додаванні нового елемента,
    /// так і при зміні вже існуючого.
    /// </summary>
    public short Quantity { get; set; }
}

