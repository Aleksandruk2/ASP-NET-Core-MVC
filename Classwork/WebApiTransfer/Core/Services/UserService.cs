using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Account;
using Domain;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;

namespace Core.Services;

public class UserService(IAuthService authService,
    AppDbTransferContext context,
    IMapper mapper,
    IEmailService emailService,
    IConfiguration config,
    UserManager<UserEntity> userManager) : IUserService
{
    public async Task<bool> ForgotPasswordAsync(ForgotPasswordModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            return false;
        }

        string token = await userManager.GeneratePasswordResetTokenAsync(user);
        var resetLink = $"{config["ClientUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";

        var result = await emailService.SendAsync(model.Email, "Password Reset", $"<p>Click the link below to reset your password:</p><a href='{resetLink}'>Reset Password</a>");

        return result;
    }

    public async Task<bool> ResetPasswordAsync(ResetPasswordModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user != null)
        {
            var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
            if(!result.Succeeded)
                return false;
        }
        else
            return false;

        return true;
    }

    public async Task<UserProfileModel> GetUserProfileAsync()
    {
        var userId = await authService.GetUserIdAsync();

        var profile = await context.Users
            .ProjectTo<UserProfileModel>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(u => u.Id == userId!);

        return profile!;
    }

}
