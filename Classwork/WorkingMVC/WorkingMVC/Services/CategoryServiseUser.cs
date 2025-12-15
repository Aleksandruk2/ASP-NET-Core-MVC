using AutoMapper;
using WorkingMVC.Models.Category;
using WorkingMVC.Interfaces;

namespace WorkingMVC.Services
{
    public class CategoryServiseUser(ICategoryRepository categoryRepository,
        IMapper mapper) : ICategoryServiceUser
    {
        public async Task<List<CategoryItemModel>> GetAllAsync()
        {
            var listTest = await categoryRepository.GetAllAsync();
            var model = mapper.Map<List<CategoryItemModel>>(listTest);
            return model;
        }
    }
}
