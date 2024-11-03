using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Member.Controllers
{
    [Authorize]
    [Route("api/member/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ContentController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        ///     Get the content of given category item
        /// </summary>
        /// <param name="categoryItemId">Category Item id</param>
        /// <returns><see cref="Content"/>Content for category item</returns>
        [HttpGet("{categoryItemId}")]
        [ProducesResponseType<Content>(200)]
        public async Task<ActionResult<Content>> GetContent([FromRoute] [Required] int categoryItemId)
        {
            return Ok(await _dbContext.Contents.FirstOrDefaultAsync(item => item.CategoryItem.Id == categoryItemId));
        }
    }
}
