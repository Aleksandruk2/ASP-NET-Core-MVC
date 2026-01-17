using Core.Models.Account;

namespace Core.Interfaces;

public interface IUserService
{
    Task<UserProfileModel> GetUserProfileAsync();
    Task<bool> ForgotPasswordAsync(ForgotPasswordModel model);
    Task<bool> ResetPasswordAsync(ResetPasswordModel model);
}

