using Cookie.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Cookie.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        [HttpPost("login")]
        public IActionResult Login([FromBody]Login user)
        {
            if (user == null)
                return BadRequest("Invalid user");
            if(user.email == "test@gmail.com" && user.password == "123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Password#123GGEz)&*(777%$FazSol"));
                var signingCredentials = new SigningCredentials(secretKey,SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken
                    (
                        issuer: "http://localhost:7006/",
                        audience: "http://localhost:7006/",
                        claims: new List<Claim>(),
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: signingCredentials
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new AuthenticatedResponse { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
