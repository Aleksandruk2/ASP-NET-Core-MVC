using Domain;
using Domain.Seed;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Підключили Db
builder.Services.AddDbContext<AppDbTransferContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

//Добавили swagger
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

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
        Console.WriteLine("Country:" + country.Name + "image:" + country.Image);
    }
}

app.Run(); 