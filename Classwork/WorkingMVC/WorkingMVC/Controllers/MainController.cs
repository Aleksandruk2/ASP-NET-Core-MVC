using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkingMVC.Data;
using WorkingMVC.Data.Entities;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Category;
using System.IO;
using System.Threading.Tasks;

namespace WorkingMVC.Controllers;

//.NEt 8.0 та 9.0
public class MainController(MyAppDbContext myAppDbContext,
    IConfiguration configuration,
    IMapper mapper,
    IImageService imageService) : Controller
{
    public async Task<IActionResult> Index()
    {
        var list = await myAppDbContext.Categories
            .ProjectTo<CategoryItemModel>(mapper.ConfigurationProvider).ToListAsync();
        //    .Select(x => new CategoryItemModel
        //{
        //    Id = x.Id,
        //    Name = x.Name,
        //    Image = x.Image
        //}).ToList();
        return View(list);
    }

    //Для того, щоб побачити сторінку створення категорії
    [HttpGet] //Щою побачити сторінку і внести інформацію про категорію
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost] //Збереження даних
    public async Task<IActionResult> Create(CategoryCreateModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model); //якщо модель не валідна викидаємо данні назад. Щоб користувач знав, що він невірно ввів 
        }

        string name = model.Name.Trim().ToLower();

        var entity = myAppDbContext.Categories.FirstOrDefault(c => c.Name.ToLower() == name);

        if (entity != null)
        {
            ModelState.AddModelError("", "У нас проблеми Хюстон. " + $"Така категорія уже існує '{model.Name}'");
            return View(model);
        }

        entity = new CategoryEntity
        {
            Name = model.Name.Trim(),
        };

        var dirImageName = configuration.GetValue<string>(key: "DirImageName");

        if(model.Image != null)
        {
            entity.Image = await imageService.UploadImageAsync(model.Image);
            ////Guid - генерує випадкову величину, яка не може повторитися
            //var fileName = Guid.NewGuid().ToString() + ".jpg";
            //var pathSave = Path.Combine(Directory.GetCurrentDirectory(),dirImageName ?? "images", fileName);
            //using var stream = new FileStream(pathSave, FileMode.Create);
            //model.Image.CopyTo(stream); //Зберігаємо фото, яке не приходить у папку.
            //entity.Image = fileName;
        }

        myAppDbContext.Categories.Add(entity);
        myAppDbContext.SaveChanges();

        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = myAppDbContext.Categories.FirstOrDefault(c => c.Id == id);

        if (entity != null)
        {
            await imageService.DeleteImageAsync(entity.Image);

            myAppDbContext.Categories.Remove(entity);
            myAppDbContext.SaveChanges();
        }

        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public IActionResult Edit(int id)
    {
        var entity = myAppDbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (entity == null) 
        {
            return NotFound();
        }

        var model = new CategoryEditModel
        {
            Id = id,
            Name = entity.Name,
            ImageUrl = entity.Image
        };

        //Console.ForegroundColor = ConsoleColor.DarkCyan;
        //Console.Write("IMAGE: ");
        //Console.ForegroundColor = ConsoleColor.DarkGreen;
        //Console.WriteLine(entity.Image);
        //Console.ResetColor();

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Edit(CategoryEditModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var category = myAppDbContext.Categories.FirstOrDefault(c => c.Id == model.Id);

        if (category.Name != model.Name)
        {
            string name = model.Name.Trim().ToLower();

            var entity = myAppDbContext.Categories.FirstOrDefault(c => c.Name.ToLower() == name);

            if (entity != null)
            {
                ModelState.AddModelError("", "У нас проблеми Хюстон. " + $"Така категорія уже існує '{model.Name}'");
                return View(model);
            }
        }
       
        category.Name = model.Name.Trim();

        if (model.Image != null)
        {
            await imageService.DeleteImageAsync(category.Image);

            category.Image = await imageService.UploadImageAsync(model.Image);
        }

        myAppDbContext.SaveChanges();

        return RedirectToAction(nameof(Index));
    }
}