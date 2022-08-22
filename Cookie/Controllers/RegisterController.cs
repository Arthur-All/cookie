using Cookie.Model;
using Microsoft.AspNetCore.Mvc;

namespace Cookie.Controllers
{
    public class RegisterController : Controller
    {
        private DataContext _context;
        public RegisterController(DataContext context)
        {
            _context = context;
        }

        [Route("[controller]")]
        [ApiController]
        public class RegisterController : ControllerBase
        {
            [HttpPost("post")]
            public async Task<ActionResult<List<Login>>> AddFood(Login Login)
            {
                Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Login> entityEntry = _context.Logindb.Add(Login);
                var result = await _context.SaveChangesAsync();

                if (result == 1)
                {
                    await _myHub.Clients.All.SendAsync("Send", "POSTED!");
                }

                return Ok(await _context.FoodList.ToListAsync());
            }
        }
    }
}
