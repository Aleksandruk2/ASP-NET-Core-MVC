using System.ComponentModel.DataAnnotations;

namespace WorkingMVC.Models.Account
{
    public class ForgotPasswordViewModel
    {
        [Display(Name = "Введіть ваш email")]
        [Required(ErrorMessage = "Це поле обов'язкове!")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
