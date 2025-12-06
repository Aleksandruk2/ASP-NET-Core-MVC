using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;
using WorkingMVC.Data;
using WorkingMVC.Data.Entities;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Category;

namespace WorkingMVC.Controllers;

//.NEt 8.0 та 9.0
public class MainController(MyAppDbContext myAppDbContext,
    ICategoryService categoryService,
    IImageService imageService) : Controller
{
    public async Task<IActionResult> Index()
    {
        //var list = await myAppDbContext.Categories
        //    .ProjectTo<CategoryItemModel>(mapper.ConfigurationProvider).ToListAsync();
        //    .Select(x => new CategoryItemModel
        //{
        //    Id = x.Id,
        //    Name = x.Name,
        //    Image = x.Image
        //}).ToList();

        var model = await categoryService.GetAllAsync();
        return View(model);
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

        try
        {
            await categoryService.CreateAsync(model);
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", ex.Message);
            return View(model);
        }

        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        await categoryService.DeleteAsync(id);
        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var model = await categoryService.EditAsync(id);
        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Edit(CategoryEditModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        try
        {
            await categoryService.EditAsync(model);
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", ex.Message);
            return View(model);
        }

        myAppDbContext.SaveChanges();
        return RedirectToAction(nameof(Index));
    }
}