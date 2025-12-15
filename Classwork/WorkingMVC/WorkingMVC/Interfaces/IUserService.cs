using WorkingMVC.Areas.Admin.Models.Users;
using WorkingMVC.Data.Entities.Identity;

namespace WorkingMVC.Interfaces
{
    public interface IUserService
    {
       Task<List<UserItemModel>> GetUsersAsync();
       Task<UserEditModel> EditAsync(int id);
        Task<UserEntity> GetUserByIdAsync(int id);
    }
}
