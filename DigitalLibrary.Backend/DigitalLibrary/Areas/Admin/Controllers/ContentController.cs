using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;

namespace DigitalLibrary.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Content
        /// <summary>
        ///     Get list of contents.
        /// </summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<Content>>(200)]
        public async Task<ActionResult<IEnumerable<Content>>> GetContent()
        {
            return await _context.Content.ToListAsync();
        }

        // GET: api/Content/5
        /// <summary>
        ///     Get content of given id.
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType<Content>(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Content>> GetContent(int id)
        {
            var content = await _context.Content.FindAsync(id);

            if (content == null)
            {
                return NotFound();
            }

            return content;
        }

        // PUT: api/Content/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        ///     Update content of id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="content"></param>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutContent(int id, Content content)
        {
            if (id != content.Id)
            {
                return BadRequest();
            }

            _context.Entry(content).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(id))
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

        // POST: api/Content
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        ///     Add new content.
        /// </summary>
        /// <param name="content"></param>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType<Content>(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
            await _context.Content.AddAsync(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContent", new { id = content.Id }, content);
        }

        // DELETE: api/Content/5
        /// <summary>
        ///     Delete content of id.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteContent(int id)
        {
            var content = await _context.Content.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            _context.Content.Remove(content);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContentExists(int id)
        {
            return _context.Content.Any(e => e.Id == id);
        }
    }
}
