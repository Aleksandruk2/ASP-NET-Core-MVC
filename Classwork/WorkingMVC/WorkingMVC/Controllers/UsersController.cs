using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WorkingMVC.Constants;
using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Interfaces;
using WorkingMVC.Models.Users;

namespace WorkingMVC.Controllers
{
    public class UsersController(IUserService userService,
        UserManager<UserEntity> userManager) : Controller
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

        [HttpPost]
        public async Task<IActionResult> Edit(UserEditModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await userService.GetUserByIdAsync(model.Id);
            
            foreach (var role in model.AllActiveRoles!)
            {
                if (role.IsActive)
                    await userManager.AddToRoleAsync(user, role.Role);
                else
                    await userManager.RemoveFromRoleAsync(user, role.Role);
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
