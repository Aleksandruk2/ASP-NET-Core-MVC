using Core.Interfaces;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Core.Services;

/// <summary>
/// Фоновий сервіс, який відправляє email-повідомлення адміністраторам при запуску сайту,
/// повідомляючи, що веб-додаток успішно запущено та готовий до роботи.
/// Виконує одноразову ініціалізацію при старті сервера.
/// </summary>
public class SiteStartupNotifierService(IServiceProvider serviceProvider) : IHostedService
{
    /// <summary>
    /// Викликається при старті веб-додатку.
    /// </summary>
    /// <param name="cancellationToken">Токен для скасування операцій при зупинці сервера.</param>
    /// <remarks>
    /// Метод створює scope для отримання UserManager, знаходить усіх користувачів у ролі "Admin"
    /// і відправляє їм email-повідомлення про запуск сайту.
    /// Підтримує скасування через CancellationToken.
    /// </remarks>
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();

        var userManager = scope.ServiceProvider
            .GetRequiredService<UserManager<UserEntity>>();
        var emailService = scope.ServiceProvider.GetService<IEmailService>();

        // Знаходимо адміна
        var admins = await userManager.GetUsersInRoleAsync("Admin");
        
        foreach (var admin in admins) 
        {
            if (admin == null || string.IsNullOrEmpty(admin.Email))
                continue;

            await emailService!.SendAsync(
                admin.Email,
                "Сайт запущено",
                "Сайт успішно запущено та готовий до роботи."
            );
        }
    }

    /// <summary>
    /// Викликається перед зупинкою веб-додатку.
    /// </summary>
    /// <param name="cancellationToken">Токен для скасування операцій при завершенні роботи сервера.</param>
    /// <remarks>
    /// У даному сервісі метод не виконує жодних дій, оскільки відправка листів відбувається лише при старті.
    /// Можна використовувати для завершення фонтових задач або звільнення ресурсів при потребі.
    /// </remarks>
    public Task StopAsync(CancellationToken cancellationToken)
        => Task.CompletedTask;
}
