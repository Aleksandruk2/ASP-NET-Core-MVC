using Core.Interfaces;
using Core.Services;
using Domain;
using Domain.Entities.Identity;
using Domain.Seed;
using FluentValidation;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Metrics;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Підключили Db
builder.Services.AddDbContext<AppDbTransferContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false; //Цифри
    options.Password.RequireNonAlphanumeric = false; //Спеціальні символи
    options.Password.RequireLowercase = false;  //Маленькі літери
    options.Password.RequireUppercase = false; //Великі літери
    options.Password.RequiredLength = 6; //Кількість символів
    options.Password.RequiredUniqueChars = 1;  //Кількість унікальних символів
})
    .AddEntityFrameworkStores<AppDbTransferContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();

//Добавили swagger
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

//Підключили Mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICountryService, CountryService>();

builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMvc(opt =>
{
    opt.Filters.Add<ValidationFilter>();
});

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(opt =>
    {
        opt.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {

                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("JWT ERROR: " + context.Exception.Message);
                Console.ResetColor();
                return Task.CompletedTask;
            }
        };

        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowReact",
        p => p
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
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

app.UseCors("AllowReact");

app.UseAuthentication();

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
    var roleManeger = scoped.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();

    //var allItems = context.Countries.ToList(); // отримуємо всі записи
    //context.Countries.RemoveRange(allItems);   // видаляємо їх
    //context.SaveChanges();

    await DbSeeder.SeedCountriesAsync(context);
    await DbSeeder.SeedRolesAsync(context, roleManeger);

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