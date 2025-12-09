using Microsoft.AspNetCore.Mvc;
using WorkingMVC.Interfaces;
using WorkingMVC.Services;

namespace WorkingMVC.Controllers
{
    public class UsersController(IUserService userService) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var result = await userService.GetUsersAsync();
            return View(result);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var model = await userService.EditAsync(id);
            return View(model);
        }
    }
}
