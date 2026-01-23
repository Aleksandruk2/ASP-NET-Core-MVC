using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Cart;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Core.Services;

/// <summary>
/// Сервіс для керування кошиком користувача.
/// Відповідає за додавання та оновлення позицій кошика,
/// прив’язаних до поточного автентифікованого користувача.
/// </summary>
public class CartService(
    AppDbTransferContext context,
    IAuthService authService,
    IMapper mapper) : ICartService
{
    /// <summary>
    /// Додає новий елемент до кошика користувача
    /// або оновлює кількість квитків для вже існуючого.
    /// </summary>
    /// <param name="model">
    /// Модель, що містить ідентифікатор рейсу та кількість квитків.
    /// </param>
    /// <remarks>
    /// Користувач визначається автоматично з поточного контексту автентифікації.
    /// Якщо позиція з таким рейсом уже існує в кошику — оновлюється кількість.
    /// Якщо не існує — створюється новий запис.
    /// </remarks>
    public async Task AddUpdateAsync(CartAddUpdateModel model)
    {
        var userID = await authService.GetUserIdAsync();

        var cartItem = await context.Carts
            .SingleOrDefaultAsync(c =>
                c.UserId == userID &&
                c.TransportationId == model.TransportationId);

        if (cartItem == null)
        {
            cartItem = new CartEntity
            {
                UserId = userID,
                TransportationId = model.TransportationId,
                CountTikets = model.Quantity
            };

            await context.Carts.AddAsync(cartItem);
        }
        else
        {
            cartItem.CountTikets = model.Quantity;
        }

        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Повертає список елементів кошика поточного авторизованого користувача.
    /// Формує дані на основі рейсів та кількості обраних квитків,
    /// використовуючи проєкцію AutoMapper для оптимальної вибірки з БД.
    /// </summary>
    /// <returns>
    /// Список елементів кошика користувача у вигляді <see cref="CartItemModel"/>.
    /// </returns>
    public async Task<List<CartItemModel>> GetListAsync()
    {
        var userId = await authService.GetUserIdAsync();
        var result = await context.Carts
            .Where(c => c.UserId == userId)
            .ProjectTo<CartItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return result;
    }
}

