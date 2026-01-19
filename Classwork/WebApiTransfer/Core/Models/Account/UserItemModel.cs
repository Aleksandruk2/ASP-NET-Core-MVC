namespace Core.Models.Account;

/// <summary>
/// Модель представлення користувача для виведення у списках або деталях.
/// Містить основну інформацію про користувача, включаючи ідентифікатор,
/// повне ім'я, електронну адресу, аватар та перелік ролей.
/// </summary>
public class UserItemModel
{
    /// <summary>
    /// Унікальний ідентифікатор користувача.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Повне ім'я користувача.
    /// Формується на основі імені та прізвища.
    /// </summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>
    /// Електронна адреса користувача.
    /// Використовується для ідентифікації та комунікації.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Посилання на зображення (аватар) користувача.
    /// Може містити як повний URL, так і відносний шлях до ресурсу.
    /// </summary>
    public string Image { get; set; } = string.Empty;

    /// <summary>
    /// Список ролей, призначених користувачу.
    /// Використовується для керування доступом та авторизації.
    /// </summary>
    public List<string> Roles { get; set; } = new();
}

