using Core.Models.Account;

namespace Core.Interfaces;

public interface IUserService
{
    public Task<UserProfileModel> GetUserProfileAsync();
    public Task<bool> ForgotPasswordAsync(ForgotPasswordModel model);
    public Task<bool> ResetPasswordAsync(ResetPasswordModel model);
    public Task<SearchResult<UserItemModel>> SearchAsync(UserSearchModel model); 
}

