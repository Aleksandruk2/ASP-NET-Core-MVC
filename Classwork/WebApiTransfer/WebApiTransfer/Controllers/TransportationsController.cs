using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TransportationsController(ITransportationService transportationService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var list = await transportationService.GetTransportationsListAsync();
            return Ok(list);
        }
    }
}
