        using DigitalLibrary.Modules.Authentication.Entities;
using DigitalLibrary.Modules.Authentication.Models;
using DigitalLibrary.Modules.Authentication.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DigitalLibrary.Modules.Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IJwtService _jWTService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AccountController(IJwtService jWTService,
            SignInManager<User> signInManager, 
            UserManager<User> userManager)
        {
            _jWTService = jWTService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        /// <summary>
        ///     Log in the user.
        /// </summary>
        /// <param name="model"><see cref="LoginModel"/></param>
        /// <returns><see cref="UserModel"/>With login successfull</returns>
        /// <returns><see cref="UnauthorizedObjectResult"/>When invalid model</returns>
        [HttpPost("login")]
        [Produces("application/json")]
        [ProducesResponseType<UserModel>(200)]
        [ProducesResponseType<string>(401)]
        public async Task<ActionResult<UserModel>> LogIn([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user == null) return Unauthorized("Invalid username or password");

                if (!user.EmailConfirmed) return Unauthorized("Please confirm your email.");

                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (!result.Succeeded) return Unauthorized("Invalid username or password");

                return CreateApplicationUserDto(user);
            }
            return Unauthorized("Invalid username or password");
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
            if (await CheckEmailExistsAsync(model.Email))
                return BadRequest($"An existing account is using {model.Email}, email address. Please try with another email address");

            var userToAdd = new User
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.Email.ToLower(),
                Email = model.Email.ToLower(),
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(userToAdd, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Your account has been created.");
        }

        /// <summary>
        ///     Refresh user token
        /// </summary>
        /// <param name="user"></param>
        /// <returns><see cref="OkObjectResult"/>With success message</returns>
        /// <returns><see cref="BadRequestObjectResult"/>When model is invalid.</returns>
        [Authorize]
        [HttpGet("refresh")]
        [Produces("application/json")]
        [ProducesResponseType<UserModel>(200)]
        [ProducesResponseType<string>(400)]
        public async Task<ActionResult<UserModel>> Refresh()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value);
            return CreateApplicationUserDto(user);
        }

        #region Private helper method
        private UserModel CreateApplicationUserDto(User user)
        {
            return new UserModel
            {
                Firstname = user.FirstName,
                Lastname = user.LastName,
                JWT = _jWTService.CreateJwt(user)
            };
        }

        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
        #endregion
    }
}