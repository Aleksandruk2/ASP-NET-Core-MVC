using WorkingMVC.Models.Category;

namespace WorkingMVC.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryItemModel>> GetAllAsync();
    Task CreateAsync(CategoryCreateModel model);

    Task DeleteAsync(int id);
    Task<CategoryEditModel> EditAsync(int id);
    Task EditAsync(CategoryEditModel model);
}
