using AutoMapper.Internal.Mappers;
using Core.Interfaces;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Core.Services;

public class AuthService(IHttpContextAccessor httpContextAccessor) : IAuthService
{
    public async Task<int> GetUserIdAsync()
    {
        var userId = httpContextAccessor.HttpContext?.User.Claims.First().Value;
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("Користувач не авторизоватий");
        }
        return int.Parse(userId);
    }
}
