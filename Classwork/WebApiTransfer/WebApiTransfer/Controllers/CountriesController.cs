using Core.Interfaces;
using Core.Models.Location.Country;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CountriesController(ICountryService countryService) : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCountries()
        {
            var list = await countryService.GetListAsync();
            // Implementation to retrieve and return countries would go here.
            return Ok(list); //код 200
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCountry([FromForm] CountryCreateModel model)
        {
            var item = await countryService.CreateAsync(model);

            return CreatedAtAction(null, item);
            //return Created(); //код 201
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> UpdateAsync([FromForm] CountryEditModel model)
        {
            var result = await countryService.EditAsync(model);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await countryService.DeleteAsync(id);
            return Ok();
        }
    }
}
