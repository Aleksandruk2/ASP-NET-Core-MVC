namespace Core.Models.Email;

/// <summary>
/// Модель налаштувань для відправки електронної пошти через SMTP.
/// Містить параметри підключення до поштового сервера
/// (хост, порт, SSL) та облікові дані відправника.
/// </summary>
public class EmailSettingsModel
{
    /// <summary>
    /// Адреса SMTP-сервера поштового провайдера.
    /// Наприклад: <c>smtp.gmail.com</c>, <c>smtp.office365.com</c>.
    /// </summary>
    public string Host { get; set; } = null!;

    /// <summary>
    /// Порт SMTP-сервера.
    /// Зазвичай: 25, 465 (SSL) або 587 (STARTTLS).
    /// </summary>
    public int Port { get; set; }


    /// <summary>
    /// Визначає, чи потрібно використовувати SSL/TLS
    /// для захищеного зʼєднання з SMTP-сервером.
    /// </summary>
    public bool EnableSsl { get; set; }

    /// <summary>
    /// Імʼя користувача для автентифікації на SMTP-сервері.
    /// Зазвичай це повна email-адреса відправника.
    /// </summary>
    public string UserName { get; set; } = null!;

    /// <summary>
    /// Пароль для автентифікації на SMTP-сервері.
    /// Рекомендується зберігати у захищеному сховищі
    /// або використовувати секрети середовища.
    /// </summary>
    public string Password { get; set; } = null!;
}
