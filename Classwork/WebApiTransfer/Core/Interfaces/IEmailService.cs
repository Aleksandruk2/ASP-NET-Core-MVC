namespace Core.Interfaces;

/// <summary>
/// Інтерфейс для посилання повідомлення на email (SMTP)
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Відправляє електронний лист за вказаною адресою.
    /// </summary>
    /// <param name="to">Email отримувача.</param>
    /// <param name="subject">Тема листа.</param>
    /// <param name="body">Текст листа.</param>
    Task<bool> SendAsync(string to, string subject, string body);
}

