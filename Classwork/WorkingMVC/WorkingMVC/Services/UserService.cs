using AutoMapper.QueryableExtensions;
using AutoMapper;
using WorkingMVC.Data;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Users;
using Microsoft.EntityFrameworkCore;
using WorkingMVC.Models.Category;

namespace WorkingMVC.Services
{
    public class UserService(MyAppDbContext context,
        IMapper mapper) : IUserService
    {
        public async Task<UserItemModel> EditAsync(int id)
        {
            var model = new UserItemModel { Id = id };
            return model;
        }

        public async Task<List<UserItemModel>> GetUsersAsync()
        {
            //Це sql запит
            var query = context.Users;
            var model = await query.ProjectTo<UserItemModel>(mapper.ConfigurationProvider).ToListAsync();

            return model;
        }
    }
}
