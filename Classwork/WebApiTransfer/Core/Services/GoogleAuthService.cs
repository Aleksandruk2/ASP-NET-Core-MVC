using AutoMapper;
using Core.Interfaces;
using Domain.Constants;
using Domain.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Core.Services;

public class GoogleAuthService(IConfiguration config, UserManager<UserEntity> userManager,
    IMapper mapper) : IGoogleAuthService
{
    public async Task<UserEntity> ValidateIdTokenAsync(string idToken)
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(
            idToken,
            new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { config["GoogleAuth:ClientId"] }
            });

        var user = await userManager.FindByEmailAsync(payload.Email);
        if(user == null)
        {
            user = mapper.Map<UserEntity>(payload);
            await userManager.CreateAsync(user);
            await userManager.AddToRoleAsync(user, Roles.User);
        }

        var info = new UserLoginInfo
        (
            loginProvider: "Google",
            providerKey: payload.Subject,
            providerDisplayName: "Google"
        );

        var existingLogins = await userManager.GetLoginsAsync(user);
        if (!existingLogins.Any(l => l.LoginProvider == info.LoginProvider && l.ProviderKey == info.ProviderKey))
        {
            await userManager.AddLoginAsync(user, info);
        }

        return user;
    }
    public async Task<string> GenerateJwtAsync(UserEntity user)
    {
        var claims = new List<Claim>
{
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email!),
        new Claim(ClaimTypes.Name, user.UserName!)
};

        if (!string.IsNullOrEmpty(user.FirstName))
            claims.Add(new Claim("firstName", user.FirstName));

        if (!string.IsNullOrEmpty(user.LastName))
            claims.Add(new Claim("lastName", user.LastName));

        if (!string.IsNullOrEmpty(user.Image))
            claims.Add(new Claim("image", user.Image));

        var roles = await userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(
           Encoding.UTF8.GetBytes(config["Jwt:Key"]!)
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}
