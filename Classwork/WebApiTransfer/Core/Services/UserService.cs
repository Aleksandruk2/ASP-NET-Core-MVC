using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Account;
using Core.Models.Search;
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
        try
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
        catch
        {
            return false;
        }
        
    }

    public async Task<bool> ResetPasswordAsync(ResetPasswordModel model)
    {
        try
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
        catch
        {
            return false; 
        }   
    }

    public async Task<UserProfileModel> GetUserProfileAsync()
    {
        var userId = await authService.GetUserIdAsync();

        var profile = await context.Users
            .ProjectTo<UserProfileModel>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(u => u.Id == userId!);

        return profile!;
    }

    public async Task<SearchResult<UserItemModel>> SearchAsync(UserSearchModel model)
    {
        var query = context.Users.AsQueryable();
        if (!string.IsNullOrWhiteSpace(model.Name))
        {
            string nameFilter = model.Name.Trim().ToLower().Normalize();
            query = query.Where(u =>
                (u.FirstName + " " + u.LastName).ToLower().Contains(nameFilter)
                || u.FirstName.ToLower().Contains(nameFilter)
                || u.LastName.ToLower().Contains(nameFilter));
        }

        if (model?.StartDate.HasValue == true)
        {
            var startUtc = DateTime.SpecifyKind(
                model.StartDate.Value,
                DateTimeKind.Utc);

            query = query.Where(u => u.DateCreated >= startUtc);
        }

        if (model?.EndDate.HasValue == true)
        {
            var endUtc = DateTime.SpecifyKind(
                model.EndDate.Value,
                DateTimeKind.Utc);

            query = query.Where(u => u.DateCreated < endUtc);
        }

        //кількіть загальних елементів для пагінації
        var totalItems = await query.CountAsync();
        //кількість записів на сторінку
        var safeItemsPerPage = model.ItemPerPage < 1 ? 10 : model.ItemPerPage;
        //Кількість записву ділене на кількість сторінок і округлення в більшу сторону
        var totalPages = (int)Math.Ceiling((double)totalItems / safeItemsPerPage);
        //Безпечна поточна сторінка
        var safePage = Math.Min(Math.Max(1, model.Page), Math.Max(1, totalPages));
        var users = await query
            .OrderBy(u => u.Id)
            .Skip((safePage - 1) * safeItemsPerPage) //пропускаємо елементи для попередніх сторінок
            .Take(safeItemsPerPage) //беремо елементи для поточної сторінки
            .ProjectTo<UserItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        foreach (var user in users) 
        {
            if (!Uri.IsWellFormedUriString(user.Image, UriKind.Absolute))
                user.Image = $"{config["DirImagePath"]}{user.Image}";
        }

        var result = new SearchResult<UserItemModel>
        {
            Items = users,
            Pagination = new PaginationModel
            {
                TotalCount = totalItems,
                TotalPages = totalPages,
                ItemsPerPage = safeItemsPerPage,
                CurrentPage = safePage
            }
        };
        return result;
    }
}
