using AutoMapper;
using Core.Interfaces;
using Core.Models.Account;
using Core.Services;
using Domain.Constants;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService,
    IMapper mapper,
    IImageService imageService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized("Invalid email or password.");
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

        result = await userManager.AddToRoleAsync(user, Roles.User);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        var token = await jwtTokenService.CreateAsync(user);
        return Ok(new { token });
    }
}
