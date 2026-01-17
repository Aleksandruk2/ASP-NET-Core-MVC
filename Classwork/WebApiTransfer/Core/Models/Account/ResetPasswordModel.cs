namespace Core.Models.Account;

/// <summary>
/// Модель запиту для завершення процесу скидання пароля користувача.
/// Містить необхідні дані для перевірки токена та встановлення нового пароля.
/// </summary>
public class ResetPasswordModel
{
    /// <summary>
    /// Email-адреса користувача, для якого виконується скидання пароля.
    /// Використовується для ідентифікації облікового запису.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Токен скидання пароля, згенерований системою та надісланий користувачу
    /// електронною поштою. Використовується для перевірки дійсності запиту.
    /// </summary>
    public string Token { get; set; } = string.Empty;

    /// <summary>
    /// Новий пароль користувача.
    /// Повинен відповідати вимогам безпеки, визначеним у системі.
    /// </summary>
    public string NewPassword { get; set; } = string.Empty;

    /// <summary>
    /// Підтвердження нового пароля.
    /// Повинно співпадати зі значенням властивості <see cref="NewPassword"/>.
    /// </summary>
    public string ConfirmNewPassword { get; set; } = string.Empty;
}
