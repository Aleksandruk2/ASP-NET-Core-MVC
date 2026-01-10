using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Identity;
using Domain.Entities.Location;
using Domain.Seed.SeedModel;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace Domain.Seed;

public static class DbSeeder
{
    /// <summary>
    /// Створює стандартнині країни у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// 
    /// await Seeder.SeedCountriesAsync(context);
    /// </code>
    /// </example>
    public static async Task SeedCountriesAsync(AppDbTransferContext context)
    {
        if (context.Countries.Any())
            return;
        //var jsonPath = "../Domain/Seed/countries.json";
        //var json = await File.ReadAllTextAsync(jsonPath, Encoding.UTF8);

        var domainAssembly = typeof(DbSeeder).Assembly;

        using var stream = domainAssembly.GetManifestResourceStream("Domain.Seed.countries.json");
        using var reader = new StreamReader(stream!);
        var json = await reader.ReadToEndAsync();

        var countries = JsonSerializer.Deserialize<List<CountryEntity>>(json);

        if (countries == null || countries.Count == 0)
            return;

        await context.Countries.AddRangeAsync(countries);
        await context.SaveChangesAsync();
    }


    /// <summary>
    /// Створює стандартнині міста у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// 
    /// await Seeder.SeedCitiesAsync(context);
    /// </code>
    /// </example>
    public static async Task SeedCitiesAsync(AppDbTransferContext context)
    {
        if (context.Cities.Any())
            return;

        //var jsonPath = "../Domain/Seed/cities.json";
        //var json = await File.ReadAllTextAsync(jsonPath, Encoding.UTF8);

        var domainAssembly = typeof(DbSeeder).Assembly;

        using var stream = domainAssembly.GetManifestResourceStream("Domain.Seed.cities.json");
        using var reader = new StreamReader(stream!);
        var json = await reader.ReadToEndAsync();

        var cities = JsonSerializer.Deserialize<List<CityEntity>>(json);

        if (cities == null || cities.Count == 0)
            return;

        await context.Cities.AddRangeAsync(cities);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Створює стандартнині транспортані статуси у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// 
    /// await Seeder.SeedTransportationStatusesAsync(context);
    /// </code>
    /// </example>
    public static async Task SeedTransportationStatusesAsync(AppDbTransferContext context)
    {
        if (context.TransportationStatuses.Any())
            return;

        //var jsonPath = "../Domain/Seed/transportation-statuses.json";
        //var json = await File.ReadAllTextAsync(jsonPath, Encoding.UTF8);

        var domainAssembly = typeof(DbSeeder).Assembly;

        using var stream = domainAssembly.GetManifestResourceStream("Domain.Seed.transportation-statuses.json");
        using var reader = new StreamReader(stream!);
        var json = await reader.ReadToEndAsync();

        var statuses = JsonSerializer.Deserialize<List<TransportationStatusEntity>>(json);

        if (statuses == null || statuses.Count == 0)
            return;

        await context.TransportationStatuses.AddRangeAsync(statuses);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Створює стандартнині транспортації у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// 
    /// await Seeder.SeedTransportationAsync(context);
    /// </code>
    /// </example>
    public static async Task SeedTransportationAsync(AppDbTransferContext context)
    {
        if (context.Transportations.Any())
            return;

        //var jsonPath = "../Domain/Seed/transportations.json";
        //var json = await File.ReadAllTextAsync(jsonPath, Encoding.UTF8);

        var domainAssembly = typeof(DbSeeder).Assembly;

        using var stream = domainAssembly.GetManifestResourceStream("Domain.Seed.transportations.json");
        using var reader = new StreamReader(stream!);
        var json = await reader.ReadToEndAsync();

        var transportations = JsonSerializer.Deserialize<List<TransportationEntity>>(json);

        if (transportations == null || transportations.Count == 0)
            return;

        Console.WriteLine(transportations);

        foreach (var t in transportations)
        {
            if (t.SeatsAvailable > t.SeatsTotal)
                throw new Exception(
                    $"SeatsAvailable > SeatsTotal for {t.Code}");

            if (t.ArrivalTime <= t.DepartureTime)
                throw new Exception(
                    $"ArrivalTime <= DepartureTime for {t.Code}");
        }

        await context.Transportations.AddRangeAsync(transportations);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Створює стандартних користувачів у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// await Seeder.SeedUsersAsync(context);
    /// </code>
    /// </example>
    public static async Task SeedUsersAsync(AppDbTransferContext context, UserManager<UserEntity> userManager)
    {
        if (context.Users.Any())
            return;

        //var jsonPath = "../Domain/Seed/users.json";
        //var json = await File.ReadAllTextAsync(jsonPath, Encoding.UTF8);

        var domainAssembly = typeof(DbSeeder).Assembly;

        using var stream = domainAssembly.GetManifestResourceStream("Domain.Seed.users.json");
        using var reader = new StreamReader(stream!);
        var json = await reader.ReadToEndAsync();

        var users = JsonSerializer.Deserialize<List<UserSeedModel>>(json);

        if (users == null || users.Count == 0)
            return;

        foreach (var model in users)
        {
            var user = new UserEntity
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Image = model.Image
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));
        }
    }

    /// <summary>
    /// Створює стандартні ролі у базі даних, якщо їх ще немає.
    /// </summary>
    /// <param name="context">DbContext для доступу до бази даних.</param>
    /// <param name="roleManager">RoleManager для керування ролями.</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// using var scope = app.Services.CreateScope();
    /// var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    /// var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
    ///
    /// await Seeder.SeedRolesAsync(context, roleManager);
    /// </code>
    /// </example>
    public static async Task SeedRolesAsync(AppDbTransferContext context, RoleManager<RoleEntity> roleManager)
    {
        if (!context.Roles.Any())
        {
            foreach (var roleName in Roles.AllRoles)
            {
                var role = new RoleEntity(roleName);
                var result = await roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"---Додали нову роль {roleName}---");
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
                    Console.WriteLine($"+++ проблема створення ролі³ {roleName} +++");
                    Console.ResetColor();
                }
            }
        }
    }

    /// <summary>
    /// Копіює базові зображеня у папку images, якщо їх ще немає.
    /// </summary>
    /// <param name="targetDirectory">Шлях до папки (images) де зберігаються зображеня</param>
    /// <returns>Задача, що виконується асинхронно.</returns>
    /// <example>
    /// Приклад виклику:
    /// <code>
    /// await Seeder.SeedImagesAsync(path);
    /// </code>
    /// </example>
    public static async Task SeedImagesAsync(string targetDirectory)
    {
        if (Directory.EnumerateFileSystemEntries(targetDirectory).Any())
            return;

        Directory.CreateDirectory(targetDirectory);

        var domainAssembly = typeof(DbSeeder).Assembly;

        var allowedExtensions = new[] { ".webp", ".png", ".jpg", ".jpeg" };

        var embeddedImages = domainAssembly
            .GetManifestResourceNames()
            .Where(r => allowedExtensions.Any(ext => r.EndsWith(ext, StringComparison.OrdinalIgnoreCase)))
            .ToArray();


        foreach (var resourceName in embeddedImages)
        {
            var parts = resourceName.Split('.'); 
            var fileName = parts[parts.Length - 2] + "." + parts[parts.Length-1];

            string filePath = Path.Combine(targetDirectory, fileName);

            if (File.Exists(filePath))
                continue;

            using var stream = domainAssembly.GetManifestResourceStream(resourceName)!;
            using var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write);
            await stream.CopyToAsync(fileStream);
        }
    }

}
