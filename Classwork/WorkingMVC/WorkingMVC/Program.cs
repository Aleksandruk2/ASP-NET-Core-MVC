using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WorkingMVC.Data;
using WorkingMVC.Interfaces;
using WorkingMVC.Repositories;
using WorkingMVC.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<MyAppDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<ICategoryService, CategoryServise>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

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
    myAppDbContext.Database.Migrate(); //якщо ми не робили міграції

    //if (!myAppDbContext.Categories.Any())
    //{
    //    var categories = new List<CategoryEntity>
    //    {
    //        new CategoryEntity
    //        {
    //            Name = "Напої безалкогольні",
    //            Image = "https://akva-svit.com.ua/image/cache/catalog/articles/blog-novosti/221-1200x650.webp",
    //        },
    //        new CategoryEntity
    //        {
    //            Name = "Овочі та фрукти",
    //            Image = "https://agronews.ua/wp-content/uploads/2021/12/12140108_12140142_679e3fe06c8a4bbfda47d1321ddd3f3f_-620x370.webp",
    //        }
    //    };
    //    myAppDbContext.Categories.AddRange(categories);
    //    myAppDbContext.SaveChanges();
    //}
}

app.Run();
