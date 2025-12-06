using AutoMapper;
using WorkingMVC.Data;
using WorkingMVC.Data.Entities;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Category;

namespace WorkingMVC.Services
{
    public class CategoryServise(ICategoryRepository categoryRepository,
        IImageService imageService,
        IMapper mapper) : ICategoryService
    {
        public async Task CreateAsync(CategoryCreateModel model)
        {
            var entity = await categoryRepository.FindByNameAsync(model.Name);

            if (entity != null)
            {
                throw new Exception("У нас проблеми Хюстон. " + $"Така категорія уже існує '{model.Name}'");
            }

            entity = new CategoryEntity
            {
                Name = model.Name.Trim(),
            };

            if (model.Image != null)
            {
                entity.Image = await imageService.UploadImageAsync(model.Image);
            }
            await categoryRepository.AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await categoryRepository.GetByIdAsync(id);

            if (entity != null)
            {
                await categoryRepository.DeleteAsync(entity);   
            }
        }

        public async Task<CategoryEditModel> EditAsync(int id)
        {
            var entity = await categoryRepository.GetByIdAsync(id);

            var model = new CategoryEditModel
            {
                Id = id,
                Name = entity.Name,
                ImageUrl = entity.Image
            };
            return model;
        }

        public async Task EditAsync(CategoryEditModel model)
        {
            var category = await categoryRepository.GetByIdAsync(model.Id);

            if (category.Name != model.Name)
            {
                var entity = await categoryRepository.FindByNameAsync(model.Name);

                if (entity != null)
                {
                    throw new Exception("У нас проблеми Хюстон. " + $"Така категорія уже існує '{model.Name}'");
                }
            }

            category.Name = model.Name.Trim();

            if (model.Image != null)
            {
                await imageService.DeleteImageAsync(category.Image);

                category.Image = await imageService.UploadImageAsync(model.Image);
            }
        }

        public async Task<List<CategoryItemModel>> GetAllAsync()
        {
            var listTest = await categoryRepository.GetAllAsync();
            var model = mapper.Map<List<CategoryItemModel>>(listTest);
            return model;
        }
    }
}
