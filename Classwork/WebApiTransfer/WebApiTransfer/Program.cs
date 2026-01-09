using Core.Interfaces;
using Core.Models.Account;
using Core.Services;
using Domain;
using Domain.Entities.Identity;
using Domain.Seed;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

var assemblyName = typeof(LoginModel).Assembly.GetName().Name;

//Щоб отримати доступ до HttpContext в сервісах
builder.Services.AddHttpContextAccessor();

//Добавили swagger
builder.Services.AddSwaggerGen(opt =>
{
    var fileDoc = $"{assemblyName}.xml";
    var filePath = Path.Combine(AppContext.BaseDirectory, fileDoc);
    opt.IncludeXmlComments(filePath);

    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });

});

builder.Services.AddCors();

//Підключили Mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICountryService, CountryService>();

builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IUserService, UserService>();

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
        opt.SaveToken = true;

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
    var userManager = scoped.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();

    //var allItems = context.Countries.ToList(); // отримуємо всі записи
    //context.Countries.RemoveRange(allItems);   // видаляємо їх
    //context.SaveChanges();

    await DbSeeder.SeedCountriesAsync(context);
    await DbSeeder.SeedCitiesAsync(context);
    await DbSeeder.SeedRolesAsync(context, roleManeger);
    await DbSeeder.SeedUsersAsync(context, userManager);
    await DbSeeder.SeedTransportationStatusesAsync(context);
    await DbSeeder.SeedTransportationAsync(context);
    

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

    //var adminUser = new UserEntity
    //{
    //    UserName = "admin@gmail.com",
    //    Email = "admin@gmail.com",
    //    FirstName = "System",
    //    LastName = "Administrator",
    //    Image = "default.jpg"
    //};
    //var result = await userManager.CreateAsync(adminUser, "Admin123");
    //if (result.Succeeded)
    //{
    //    Console.ForegroundColor = ConsoleColor.Green;
    //    Console.WriteLine("Користувача 'admin@gmail.com' додано. Очікується додавання ролі...");
    //    result = await userManager.AddToRoleAsync(adminUser, "Admin");
    //    if (result.Succeeded)
    //    {
    //        Console.ForegroundColor = ConsoleColor.Green;
    //        Console.WriteLine("Роль успішно додана.");
    //    }
    //}

    //foreach (var user in context.Users.ToArray())
    //{
    //    Console.ForegroundColor = ConsoleColor.Red;
    //    Console.Write($" [Email: {user.Email}]");
    //    Console.ForegroundColor = ConsoleColor.Magenta;
    //    Console.Write(" [image:" + user.Image + "]");
    //    Console.ForegroundColor = ConsoleColor.DarkCyan;
    //    Console.Write(" [LastName: " + user.LastName + "]");
    //    Console.ForegroundColor = ConsoleColor.DarkYellow;
    //    Console.WriteLine(" [FirstName:" + user.FirstName+ "]");
    //}
    //Console.ResetColor();
}

app.Run(); 