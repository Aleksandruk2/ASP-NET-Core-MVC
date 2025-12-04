using AutoMapper;
using WorkingMVC.Data.Entities;
using WorkingMVC.Models.Category;

namespace WorkingMVC.Models.Mappers
{
    public class CategoryMapper : Profile
    {
        public CategoryMapper()
        {
            CreateMap<CategoryEntity, CategoryItemModel>();
        }
    }
}
