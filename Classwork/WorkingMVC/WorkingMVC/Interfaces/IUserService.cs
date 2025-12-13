using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Models.Category;
using WorkingMVC.Models.Users;

namespace WorkingMVC.Interfaces
{
    public interface IUserService
    {
       Task<List<UserItemModel>> GetUsersAsync();
       Task<UserEditModel> EditAsync(int id);
        Task<UserEntity> GetUserByIdAsync(int id);
    }
}
