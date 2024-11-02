using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Authorization;

namespace DigitalLibrary.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    public class CategoryItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryItemController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Get list of category item.
        /// </summary>
        /// <param name="categoryId"></param>
        [HttpGet("items/{categoryId}")]
        [Produces("application/json")]
        [ProducesResponseType(401)]
        [ProducesResponseType<IEnumerable<CategoryItem>>(200)]
        public async Task<ActionResult<IEnumerable<CategoryItem>>> Get(int categoryId)
        {
            return await (from categoryItems in _context.CategoryItem
                     join contents in _context.Content
                     on categoryItems.Id equals contents.CategoryItem.Id
                     into groupedItems
                     from sub in groupedItems.DefaultIfEmpty()
                     where categoryItems.CategoryId == categoryId
                     select new CategoryItem
                     {
                         Id = categoryItems.Id,
                         CategoryId = categoryId,
                         Title = categoryItems.Title,
                         Description = categoryItems.Description,
                         MediaTypeId = categoryItems.MediaTypeId,
                         DateReleased = categoryItems.DateReleased,
                         ContentId = (sub != null) ? sub.Id : 0
                     }).ToListAsync();
        }

        /// <summary>
        ///     Get category item of given id.
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType<CategoryItem>(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CategoryItem>> GetCategoryItem(int id)
        {
            var categoryItem = await _context.CategoryItem.FindAsync(id);

            if (categoryItem == null)
            {
                return NotFound();
            }

            return categoryItem;
        }

        /// <summary>
        ///     Update category item of id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="categoryItem"></param>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutCategoryItem(int id, CategoryItem categoryItem)
        {
            if (id != categoryItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoryItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        ///     Add new category item.
        /// </summary>
        /// <param name="categoryItem"></param>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType<CategoryItem>(201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<CategoryItem>> PostCategoryItem(CategoryItem categoryItem)
        {
            await _context.CategoryItem.AddAsync(categoryItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoryItem", new { id = categoryItem.Id }, categoryItem);
        }

        /// <summary>
        ///     Delete category item of id.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteCategoryItem(int id)
        {
            var categoryItem = await _context.CategoryItem.FindAsync(id);
            if (categoryItem == null)
            {
                return NotFound();
            }

            _context.CategoryItem.Remove(categoryItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryItemExists(int id)
        {
            return _context.CategoryItem.Any(e => e.Id == id);
        }
    }
}
