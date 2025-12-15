using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using WorkingMVC.Constants;
using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Account;

namespace WorkingMVC.Controllers;

public class AccountController(
    UserManager<UserEntity> userManager,
    SignInManager<UserEntity> signInManager,
    IEmailSenderService emailSenderService,
    IImageService imageService,
    IMapper mapper) : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user != null)
        {
            var res = await signInManager
                .PasswordSignInAsync(user, model.Password, false, false);
            if (res.Succeeded)
            {
                await signInManager.SignInAsync(user, isPersistent: false);
                return Redirect("/");
            }
        }
        ModelState.AddModelError("", "Дані вказано не правильно!");
        return View(model);
    }

    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }
        var user = mapper.Map<UserEntity>(model); 

        var imageStr = model.Image is not null ?
            await imageService.UploadImageAsync(model.Image) : null;

        user.Image = imageStr;
        var result = await userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            //Даю користувачеві роль User
            result = await userManager.AddToRoleAsync(user, Roles.User);
            //Після реєстрації авторизовуємо
            await signInManager.SignInAsync(user, isPersistent: false);
            //Перехід на головну сторінку
            return RedirectToAction("Index", "Main");
        }
        else
        {
            foreach (var item in result.Errors)
            {
                ModelState.AddModelError(string.Empty, item.Description);
            }
            return View(model);
        }

    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Redirect("/");
    }

    [HttpGet]
    public IActionResult ForgotPassword()
    {
        return View();
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
    {
        if(!ModelState.IsValid)
            return View(model);

        var user = await userManager.FindByEmailAsync(model.Email);

        if(user == null)
            return View("ForgotPasswordConfirmation");

        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        var tokenEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var callbackUrl = Url.Action(
            "ResetPassword",
            "Account",
            new { email =  model.Email, token = tokenEncoded },
            protocol: Request.Scheme
        );

        await emailSenderService.SendEmailAsync(
            model.Email,
            "Відновлення пароля",
            $"Щоб скинути пароль, перейдіть за посиланням:<br><a href='{callbackUrl}'>Скинути пароль</a>"
        );

        return View("ForgotPasswordConfirmation");
    }

    [HttpGet]
    public IActionResult ResetPassword(string email, string token)
    {
        return View(new ResetPasswordViewModel
        {
            Email = email,
            Token = token
        });
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var user = await userManager.FindByEmailAsync(model.Email);

        if (user == null)
            return RedirectToAction(nameof(ResetPasswordConfirmation));

        var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token));
        var result = await userManager.ResetPasswordAsync(user, decodedToken, model.Password);

        if (result.Succeeded)
        {
            await signInManager.SignInAsync(user, isPersistent: false);
            return RedirectToAction(nameof(ResetPasswordConfirmation));
        }

        foreach (var error in result.Errors)
            ModelState.AddModelError("", error.Description);

        return View(model);
    }

    [HttpGet]
    public IActionResult ResetPasswordConfirmation()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Index()
    {
        return RedirectToAction("Index", "Main");
    }
}

