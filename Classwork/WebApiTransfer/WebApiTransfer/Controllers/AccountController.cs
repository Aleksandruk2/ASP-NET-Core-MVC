using AutoMapper;
using Core.Interfaces;
using Core.Models.Account;
using Domain.Constants;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService,
    IMapper mapper,
    IImageService imageService,
    IUserService userService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized("Невірний email або пароль.");
        }
        var token = await jwtTokenService.CreateAsync(user);
        return Ok(new { token });
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var user = mapper.Map<UserEntity>(model);
        var result = await userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        //Картика створюється після створення користувача у базі тому, що якщо створювати її до userManager.CreateAsync і операція не пройде, картинка уже буде створена і засмічуватиме пам'ять.
        if (model.Image is not null)
        {
            var imageStr = await imageService.UploadImageAsync(model.Image);
            user.Image = imageStr;
            result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
        }
        else
            user.Image = imageService.GetDefaultUserImage();

        result = await userManager.AddToRoleAsync(user, Roles.User);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        var token = await jwtTokenService.CreateAsync(user);
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Profile()
    {
        return Ok(new
        {
            id = User.FindFirstValue(ClaimTypes.NameIdentifier),
            email = User.FindFirstValue(ClaimTypes.Email),
            userName = User.FindFirstValue("userName"),
            firstName = User.FindFirstValue("firstName"),
            lastName = User.FindFirstValue("lastName"),
            image = User.FindFirstValue("image"),
            roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value)
        });
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> MyProfile()
    {
        var model = await userService.GetUserProfileAsync();
        return Ok(model);
    }

    //Відновленя паролю
    //1. Спочатку користувач вказує пошту
    //2.На пошту приходить лист, де ми можемо перейти на відновлення
    //2.1. Дане посилання має бути на fronend частину, де користувач зможе ввести новий пароль.
    //2.2. Коли користувач вводить новий пароль, frontend частина має відправити запит на acjend з новим паролем та токеном(токен - ключ для відновлення паролю).
    //3. Тобто при відновлені паролю, ми маємо знати хто є клієнт, який хоче відновити пароль (тобто домен клієнта react).

    [HttpPost]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
        bool res = await userService.ForgotPasswordAsync(model);
        if (res)
            return Ok();
        else
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Користувача з такою поштою не існує" }
            });
    }

    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        var result = await userService.ResetPasswordAsync(model);
        if (result)
            return Ok();
        else
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Невірні дані для відновлення паролюн" }
            });
    }

    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] UserSearchModel model)
    {
        //Обчислення часу виконання
        Stopwatch stopwatch = new Stopwatch();
        stopwatch.Start();

        var result = await userService.SearchAsync(model);

        stopwatch.Stop();

        // Get the elapsed time as a TimeSpan value.
        TimeSpan ts = stopwatch.Elapsed;

        // Format and display the TimeSpan value.
        string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:00}",
            ts.Hours, ts.Minutes, ts.Seconds,
            ts.Milliseconds / 10);
        Console.WriteLine("-----------Elapsed Time------------: " + elapsedTime);
        return Ok(result);
    }
}
