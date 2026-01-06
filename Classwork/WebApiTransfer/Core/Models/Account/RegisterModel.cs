using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Core.Models.Account;

public class RegisterModel
{
    [Required(ErrorMessage = "Вкажіть ім'я")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Вкажіть прізвище")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Вкажіть пошту")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Це поле обов'язкове!")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Це поле обов'язкове!")]
    [Compare("Password", ErrorMessage = "Паролі не співпадають")]
    [DataType(DataType.Password)]
    public string PasswordConfirm { get; set; } = string.Empty;

    [Required(ErrorMessage = "Оберіть фото")]
    public IFormFile? Image{ get; set; }
}
