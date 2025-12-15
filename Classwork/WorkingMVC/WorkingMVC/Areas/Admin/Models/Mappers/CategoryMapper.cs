using AutoMapper;
using WorkingMVC.Areas.Admin.Models.Category;
using WorkingMVC.Data.Entities;

namespace WorkingMVC.Areas.Admin.Models.Mappers
{
    public class CategoryMapper : Profile
    {
        public CategoryMapper()
        {
            CreateMap<CategoryEntity, CategoryItemModel>();
        }
    }
}
