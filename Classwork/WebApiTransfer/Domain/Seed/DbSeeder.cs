using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Identity;
using Domain.Entities.Location;
using Domain.Seed.SeedModel;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;
using System.Text;

namespace Domain.Seed;

public static class DbSeeder
{
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
}
