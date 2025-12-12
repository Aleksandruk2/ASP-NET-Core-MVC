using System.ComponentModel.DataAnnotations;

namespace WorkingMVC.Models.Account
{
    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Token { get; set; } = string.Empty;

        [Required(ErrorMessage = "Це поле обов'язкове!")]
        [DataType(DataType.Password)]
        [Display(Name = "Новий пароль")]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Це поле обов'язкове!")]
        [Compare("Password", ErrorMessage = "Паролі не співпадають")]
        [DataType(DataType.Password)]
        [Display(Name = "Підтвердити пароль")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

}
