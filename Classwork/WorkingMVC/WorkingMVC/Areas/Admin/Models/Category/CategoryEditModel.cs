using System.ComponentModel.DataAnnotations;

namespace WorkingMVC.Areas.Admin.Models.Category
{
    public class CategoryEditModel
    {
        //id категорії
        public int Id { get; set; }

        //Шлях до існуючої картинки
        [Display(Name = "Обране фото")]
        public string? ImageUrl { get; set; }

        //Назва категорії
        [Display(Name = "Назва")]
        public string Name { get; set; } = string.Empty;

        //Передача на сервере фото
        [Display(Name = "Обрати нове фото")]
        public IFormFile? Image { get; set; }
    }
}
