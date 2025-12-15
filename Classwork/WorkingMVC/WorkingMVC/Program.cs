using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileSystemGlobbing.Internal.Patterns;
using WorkingMVC.Constants;
using WorkingMVC.Data;
using WorkingMVC.Data.Entities.Identity;
using WorkingMVC.Interfaces;
using WorkingMVC.Repositories;
using WorkingMVC.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<MyAppDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false; //Цифри
    options.Password.RequireNonAlphanumeric = false; //Спеціальні символи
    options.Password.RequireLowercase = false;  //Маленькі літери
    options.Password.RequireUppercase = false; //Великі літери
    options.Password.RequiredLength = 6; //Кількість символів
    options.Password.RequiredUniqueChars = 1;  //Кількість унікальних символів
})
    .AddEntityFrameworkStores<MyAppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllersWithViews();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<ICategoryService, CategoryServise>();

builder.Services.AddScoped<ICategoryServiceUser, CategoryServiseUser>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IEmailSenderService, EmailSenderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseRouting();

//Це означає, що у нас є авторизація і буде працювати
//signinManager
app.UseAuthorization();

app.MapStaticAssets();

app.MapAreaControllerRoute(
    name: "MyAreaAdmin",
    areaName: "Admin",
    pattern: "admin/{controller=Dashboards}/{action=Index}/{id?}");

app.MapAreaControllerRoute(
    name: "MyAreaAdmin",
    areaName: "Admin",
    pattern: "admin/{controller=Main}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Main}/{action=Index}/{id?}")
    .WithStaticAssets();

string dirImageName = builder.Configuration.GetValue<string>("DirImageName") ?? "images";

//Console.WriteLine("Image dir {0}", dirImageName);

string path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName);
Directory.CreateDirectory(dirImageName);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dirImageName}"
});

using(var scoped = app.Services.CreateScope())
{
    var myAppDbContext = scoped.ServiceProvider.GetRequiredService<MyAppDbContext>();
    var roleManeger = scoped.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();

    myAppDbContext.Database.Migrate(); //якщо ми не робили міграції

    if (!myAppDbContext.Categories.Any())
    {
        //var categories = new List<CategoryEntity>
        //{
        //    new CategoryEntity
        //    {
        //        Name = "Напої безалкогольні",
        //        Image = "https://akva-svit.com.ua/image/cache/catalog/articles/blog-novosti/221-1200x650.webp",
        //    },
        //    new CategoryEntity
        //    {
        //        Name = "Овочі та фрукти",
        //        Image = "https://agronews.ua/wp-content/uploads/2021/12/12140108_12140142_679e3fe06c8a4bbfda47d1321ddd3f3f_-620x370.webp",
        //    }
        //};
        //myAppDbContext.Categories.AddRange(categories);
        //myAppDbContext.SaveChanges();
    }

    if (!myAppDbContext.Roles.Any()) //Якщо в БД немає ролей
    {
        foreach (var roleName in Roles.AllRoles)
        {
            var role = new RoleEntity(roleName);
            var result = await roleManeger.CreateAsync(role);
            if (result.Succeeded)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"---Створили роль {roleName}---");
                Console.ResetColor();
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"+++ Проблема {error.Description} +++");
                    Console.ResetColor();
                }
                Console.ForegroundColor = ConsoleColor.DarkYellow;
                Console.WriteLine($"+++ Проблеми створеняя ролі {roleName} +++");
                Console.ResetColor();
            }
        }
    }
}

app.Run();
