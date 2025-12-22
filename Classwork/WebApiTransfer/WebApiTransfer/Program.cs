using Core.Interfaces;
using Core.Services;
using Domain;
using Domain.Seed;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Підключили Db
builder.Services.AddDbContext<AppDbTransferContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

//Добавили swagger
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

//Підключили Mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICountryService, CountryService>();

builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMvc(options =>
{
    options.Filters.Add<ValidationFilter>();
});



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

//Конфігуруємо swagger
app.UseSwagger();

app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

var dirImageName = builder.Configuration.GetValue<string>("DirImageName") ?? "images";

string imageRoot = Directory.GetParent(AppContext.BaseDirectory)!
                              .Parent!
                              .Parent!
                              .Parent!
                              .Parent!
                              .FullName;
var path = Path.Combine(imageRoot, "Domain", dirImageName);
Directory.CreateDirectory(path);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dirImageName}"
});

using (var scoped = app.Services.CreateScope())
{
    var context = scoped.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    context.Database.Migrate();

    //var allItems = context.Countries.ToList(); // отримуємо всі записи
    //context.Countries.RemoveRange(allItems);   // видаляємо їх
    //context.SaveChanges();

    await DbSeeder.SeedCountriesAsync(context);

    foreach (var country in context.Countries.ToArray())
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.Write($" [Country: {country.Name}]");
        Console.ForegroundColor = ConsoleColor.Magenta;
        Console.Write(" [image:" + country.Image + "]");
        Console.ForegroundColor = ConsoleColor.DarkCyan;
        Console.Write(" [Code: " + country.Code + "]");
        Console.ForegroundColor = ConsoleColor.DarkYellow;
        Console.WriteLine(" [slug:" + country.Slug + "]");
    }
    Console.ResetColor();
}

app.Run(); 