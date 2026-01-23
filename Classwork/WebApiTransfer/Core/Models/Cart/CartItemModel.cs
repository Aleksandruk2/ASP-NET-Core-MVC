using Core.Models.Transportation;

namespace Core.Models.Cart;

/// <summary>
/// Модель елемента кошика користувача.
/// Наслідує інформацію про рейс та доповнює її
/// кількістю заброньованих квитків.
/// </summary>
public class CartItemModel : TransportationItemModel
{
    /// <summary>
    /// Кількість квитків, обраних користувачем для даного рейсу.
    /// Значення відповідає кількості місць,
    /// які планується придбати або зарезервувати.
    /// </summary>
    public short Quantity { get; set; }
}

