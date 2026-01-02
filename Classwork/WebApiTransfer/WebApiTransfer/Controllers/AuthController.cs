using Core.Interfaces;
using Core.Models.Account.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IGoogleAuthService googleAuthService) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("Google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthDto dto)
    {
        var payload = await googleAuthService.ValidateIdTokenAsync(dto.IdToken);

        var token = await googleAuthService.GenerateJwtAsync(payload);
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet("Profile")]
    public IActionResult Me()
    {
        return Ok(new
        {
            id = User.FindFirstValue(ClaimTypes.NameIdentifier),
            email = User.FindFirstValue(ClaimTypes.Email),
            userName = User.FindFirstValue(ClaimTypes.Name),
            firstName = User.FindFirstValue("firstName"),
            lastName = User.FindFirstValue("lastName"),
            image = User.FindFirstValue("image"),
            roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value)
        });
    }

}
