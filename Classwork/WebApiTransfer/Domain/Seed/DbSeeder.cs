using Domain.Entities.Loacation;
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
}
