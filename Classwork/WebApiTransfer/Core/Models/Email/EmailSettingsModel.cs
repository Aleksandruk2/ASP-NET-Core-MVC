namespace Core.Models.Email;

/// <summary>
/// Модель налаштувань для відправки електронної пошти через SMTP.
/// Містить параметри підключення до поштового сервера
/// (хост, порт, SSL) та облікові дані відправника.
/// </summary>
public class EmailSettingsModel
{
    /// <summary>
    /// 
    /// </summary>
    public string Host { get; set; } = null!;
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;
}
