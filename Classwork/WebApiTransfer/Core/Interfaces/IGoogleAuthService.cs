using Core.Models.Account.Dto;
using Domain.Entities.Identity;
using Google.Apis.Auth;

namespace Core.Interfaces
{
    public interface IGoogleAuthService
    {
        Task<UserEntity> ValidateIdTokenAsync(string idToken);

        Task<string> GenerateJwtAsync(UserEntity user);
    }
}
