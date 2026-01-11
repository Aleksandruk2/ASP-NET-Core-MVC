using Core.Interfaces;
using Core.Models.Email;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Core.Services;

/// <summary>
/// Сервіс для відправки електронних листів через SMTP.
/// Реалізує <see cref="IEmailService"/> та використовує налаштування,
/// визначені у конфігурації застосунку.
/// </summary>
public class EmailService(IOptions<EmailSettingsModel> options) : IEmailService
{
    /// <inheritdoc />
    public async Task SendAsync(string to, string subject, string body)
    {
        var settings = options.Value;

        // SMTP клієнт
        using var client = new SmtpClient(settings.Host, settings.Port)
        {
            Credentials = new NetworkCredential(
                settings.UserName,
                settings.Password),
            EnableSsl = settings.EnableSsl
        };

        // Email повідомлення
        using var message = new MailMessage
        {
            From = new MailAddress(settings.UserName),
            Subject = subject,
            Body = body,
            IsBodyHtml = false
        };

        message.To.Add(to);

        // Відправка
        await client.SendMailAsync(message);
    }
}

