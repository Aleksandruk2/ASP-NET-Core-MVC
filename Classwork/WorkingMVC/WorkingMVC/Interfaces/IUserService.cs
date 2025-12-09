using WorkingMVC.Models.Category;
using WorkingMVC.Models.Users;

namespace WorkingMVC.Interfaces
{
    public interface IUserService
    {
       Task<List<UserItemModel>> GetUsersAsync();
       Task<UserItemModel> EditAsync(int id);
    }
}
