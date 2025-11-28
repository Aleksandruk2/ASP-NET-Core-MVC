using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace WorkingMVC.Models.Category
{
    public class CategoryCreateModel
    {
        //Назва категорії
        [Display(Name = "Назва")]
        public string Name { get; set; } = string.Empty;
        
        //Передача на сервере фото
        [Display(Name="Фото")]
        public IFormFile? Image { get; set; }
    }
}
