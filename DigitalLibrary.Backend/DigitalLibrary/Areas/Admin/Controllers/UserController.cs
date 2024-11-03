using DigitalLibrary.Areas.Admin.Models;
using DigitalLibrary.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UserController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        ///     Get list of users.
        /// </summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<UserForAdminModel>>(200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<UserForAdminModel>>> GetUsers()
        {
            return await _dbContext.Users.Select(a => new UserForAdminModel { UserId = Guid.Parse(a.Id), Name = a.FirstName + " " + a.LastName }).ToListAsync();
        }
    }
}
