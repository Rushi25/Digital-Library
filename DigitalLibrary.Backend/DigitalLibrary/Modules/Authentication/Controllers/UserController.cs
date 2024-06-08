using DigitalLibrary.Helpers;
using DigitalLibrary.Modules.Authentication.Models;
using DigitalLibrary.Modules.Authentication.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

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

        /// <summary>
        ///     Registers the new user.
        /// </summary>
        /// <param name="model"><see cref="RegisterModel"/></param>
        /// <returns><see cref="OkObjectResult"/>With success message</returns>
        /// <returns><see cref="BadRequestObjectResult"/>When model is invalid.</returns>
        [HttpPost("register")]
        [Produces("application/json")]
        [ProducesResponseType<string>(200)]
        [ProducesResponseType<string>(400)]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var message = await _validator.ValidateAsync(model);
                if (!string.IsNullOrEmpty(message))
                {
                    return BadRequest(message);
                }
                await _userService.RegisterAsync(model);
                return Ok("User registered successfully");
            }
            return BadRequest(ModelState);
        }

        /// <summary>
        ///     Log in the user.
        /// </summary>
        /// <param name="model"><see cref="LoginModel"/></param>
        /// <returns><see cref="TokenModel"/>With login successfull</returns>
        /// <returns><see cref="BadRequestObjectResult"/>When invalid model</returns>
        [HttpPost("login")]
        [Produces("application/json")]
        [ProducesResponseType<TokenModel>(200)]
        [ProducesResponseType<string>(400)]
        public async Task<IActionResult> LogIn([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var (user, message) = await _validator.ValidateLogInAsync(model);
                if (user != null)
                {
                    var (accessToken, refreshToken) = await _userService.LogInAndGenerateTokenAsync(user);
                    return Ok(new TokenModel
                    {
                        AccessToken = accessToken,
                        RefreshToken = refreshToken,
                    });
                }
                return BadRequest(message);
            }
            return BadRequest(ModelState);
        }

        /// <summary>
        ///     Refresh login using refresh token
        /// </summary>
        /// <param name="model"><see cref="TokenModel"/></param>
        /// <returns><see cref="TokenModel"/>With new tokens</returns>
        /// <returns><see cref="BadRequestObjectResult"/>When token is invalid</returns>
        [HttpPost("refresh")]
        [Produces("application/json")]
        [ProducesResponseType<TokenModel>(200)]
        [ProducesResponseType<string>(400)]
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
