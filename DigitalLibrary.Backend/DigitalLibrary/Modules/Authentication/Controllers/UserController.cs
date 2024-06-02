using DigitalLibrary.Helpers;
using DigitalLibrary.Modules.Authentication.Models;
using DigitalLibrary.Modules.Authentication.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLibrary.Modules.Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Validator _validator;
        private readonly IUserService _userService;
        public UserController(Validator validator, IUserService userService)
        {
            _validator = validator;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var message = await _validator.ValidateAsync(model);
                if (!string.IsNullOrEmpty(message))
                {
                    return BadRequest(new { Message = message });
                }
                await _userService.RegisterAsync(model);
                return Ok(new { Message = "User registered successfully" });
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var (user, message) = await _validator.ValidateLogInAsync(model);
                if (user != null)
                {
                    var (accessToken, refreshToken) = await _userService.LogInAndGenerateTokenAsync(user);
                    return Ok(new
                    {
                        AccessToken = accessToken,
                        RefreshToken = refreshToken,
                    });
                }
                return BadRequest(new { Message = message });
            }
            return BadRequest(ModelState);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenModel model)
        {
            if (ModelState.IsValid)
            {
                var token = await _userService.RefreshAsync(model);
                if (token != null)
                {
                    return Ok(token);
                }
                return BadRequest("Invalid Request");
            }
            return BadRequest("Invalid Client Request");
        }
    }
}
