using Microsoft.AspNetCore.Http;

namespace Core.Models.Account;

public class RegisterModel
{
    /// <summary>
    /// Ім'я
    /// </summary>
    /// <example>FirtsName</example>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Прізвище
    /// </summary>
    /// <example>LastName</example>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Електронна адреса
    /// </summary>
    /// <example>exampleEmail@gmail.com</example>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Пароль
    /// </summary>
    /// <example>examplePass123</example>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Підтвердження пароля
    /// </summary>
    /// <example>examplePass123</example>
    public string PasswordConfirm { get; set; } = string.Empty;

    /// <summary>
    /// Зображеня
    /// </summary>
    public IFormFile? Image { get; set; }
}
