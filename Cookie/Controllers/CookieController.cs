using Cookie.HubConfig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Cookie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CookieController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHubContext<MyHub> _myHub;
        public CookieController(DataContext context, IHubContext<MyHub> myHub)
        {
            _context = context;
            _myHub = myHub;
        }

        [Authorize]
        [HttpGet("foodlist")]
        public async Task<ActionResult<List<Cookie>>> Get()
        {
            return Ok(await _context.FoodList.ToListAsync());
        }

        [Authorize]
        [HttpPost("post")]
        public async Task<ActionResult<List<Cookie>>> AddFood(Cookie food)
        {
            _context.FoodList.Add(food);
           var result =  await _context.SaveChangesAsync();

            if (result == 1)
            {
                await _myHub.Clients.All.SendAsync("Send", "POSTED!");
            }

            return Ok(await _context.FoodList.ToListAsync());
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult<List<Cookie>>> UpdateList(Cookie request)
        {
            var dbFood = await _context.FoodList.FindAsync(request.Id);
            if(dbFood == null)
            {
                return BadRequest("Food not found.");
            }

            dbFood.FoodName = request.FoodName;
            var result = await _context.SaveChangesAsync();

            if (result == 1)
            {
                await _myHub.Clients.All.SendAsync("Send", "UPDATED!");
            }


            return Ok(await _context.FoodList.ToListAsync());
        }

        [Authorize]
        [HttpDelete("{Id}")]
        public async Task<ActionResult<List<Cookie>>> DeleteFood(int id)
        {
            var dbFood = await _context.FoodList.FindAsync(id);
            if (dbFood == null)
            {
                return BadRequest("Food not found.");
            }

            _context.FoodList.Remove(dbFood);
            var result = await _context.SaveChangesAsync();
            if (result == 1)
            {
                await _myHub.Clients.All.SendAsync("Send", "DELETED!");
            }

            return Ok(await _context.FoodList.ToListAsync());
        }
        
    }
}
