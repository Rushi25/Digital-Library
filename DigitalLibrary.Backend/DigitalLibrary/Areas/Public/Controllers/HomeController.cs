using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Public.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public HomeController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        ///     Returns all categorie.
        /// </summary>
        /// <returns><see cref="Category"/>List of category</returns>
        [HttpGet]
        [ProducesResponseType<IEnumerable<Category>>(200)]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return Ok( await _dbContext.Categories.ToListAsync());
        }
    }
}
