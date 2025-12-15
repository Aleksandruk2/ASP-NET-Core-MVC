using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorkingMVC.Areas.Admin.Models.Users;
using WorkingMVC.Data;
using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Interfaces;

namespace WorkingMVC.Services
{
    public class UserService(MyAppDbContext context,
        IMapper mapper) : IUserService
    {
        public async Task<UserEditModel> EditAsync(int id)
        {
            var user = await context.Users
                .ProjectTo<UserItemModel>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == id);
            var model = new UserEditModel
            {
                Id = user!.Id,
                FullName = user.FullName,
                Email = user.Email,
            };
            foreach (var role in user.Roles!)
            {
                for (int i = 0; i < model.AllActiveRoles!.Count; i++)
                {
                    if (role == model.AllActiveRoles[i].Role)
                    {
                        model.AllActiveRoles[i].IsActive = true;
                        break;
                    }
                }
            }
            return model!;
        }

        public async Task<List<UserItemModel>> GetUsersAsync()
        {
            //Це sql запит
            var query = context.Users;
            var model = await query.ProjectTo<UserItemModel>(mapper.ConfigurationProvider).ToListAsync();

            return model;
        }

        public async Task<UserEntity> GetUserByIdAsync(int id)
        {
            var user = await context.Users.SingleOrDefaultAsync(x => x.Id == id);
            return user!;
        }
    }
}
