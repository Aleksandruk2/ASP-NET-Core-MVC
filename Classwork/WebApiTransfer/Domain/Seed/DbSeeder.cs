using Domain.Constants;
using Domain.Entities.Identity;
using Domain.Entities.Location;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace Domain.Seed;

public static class DbSeeder
{
    public static async Task SeedCountriesAsync(AppDbTransferContext context)
    {
        if (context.Countries.Any())
            return;

        var jsonPath = "../Domain/Seed/countries.json";

        var json = await File.ReadAllTextAsync(jsonPath);

        var countries = JsonSerializer.Deserialize<List<CountryEntity>>(json);

        if (countries == null || countries.Count == 0)
            return;

        await context.Countries.AddRangeAsync(countries);
        await context.SaveChangesAsync();
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
