using Core.Models.Account;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

public class RegisterValidator : AbstractValidator<RegisterModel>
{
    public RegisterValidator(AppDbTransferContext db)
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("Ім'я не може бути порожнім")
            .MaximumLength(50).WithMessage("Ім'я не може перевищувати 50 символів");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Прізвище не може бути порожнім")
            .MaximumLength(50).WithMessage("Прізвище не може перевищувати 50 символів");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email не може бути порожнім")
            .EmailAddress().WithMessage("Email має бути дійсним")
            .DependentRules(() =>
            {
                RuleFor(x => x.Email)
                    .MustAsync(async (email, cancellation) =>
                        !await db.Users.AnyAsync(u => u.Email!.ToLower() == email.ToLower().Trim(), cancellation))
                    .WithMessage("Користувач з таким email вже існує");
            });

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль не може бути порожнім")
            .MinimumLength(6).WithMessage("Пароль повинен містити щонайменше 6 символів");

        RuleFor(x => x.PasswordConfirm)
            .NotEmpty().WithMessage("Підтвердження пароля не може бути порожнім")
            .Equal(x => x.Password).WithMessage("Паролі не співпадають");

        RuleFor(x => x.Image)
            .Must(file => file == null || file!.Length <= 5 * 1024 * 1024) //5MB
            .WithMessage("Розмір файлу не може перевищувати 5 МБ");
    }
}
