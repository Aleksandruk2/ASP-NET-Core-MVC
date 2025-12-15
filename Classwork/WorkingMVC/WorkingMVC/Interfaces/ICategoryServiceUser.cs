using WorkingMVC.Models.Category;

namespace WorkingMVC.Interfaces;

public interface ICategoryServiceUser
{
    Task<List<CategoryItemModel>> GetAllAsync();
}
