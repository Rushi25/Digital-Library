﻿using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Content/5
        /// <summary>
        ///     Get content of given id.
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType<Content>(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Content>> GetContent(int id)
        {
            var content = await _context.Contents.FindAsync(id);

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
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutContent(int id, Content content)
        {
            if (id != content.Id)
            {
                return BadRequest();
            }
            content.CategoryItem = await _context.CategoryItems.FindAsync(content.CatItemId);
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
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
            content.CategoryItem = await _context.CategoryItems.FindAsync(content.CatItemId);
            await _context.Contents.AddAsync(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContent", new { id = content.Id }, content);
        }

        private bool ContentExists(int id)
        {
            return _context.Contents.Any(e => e.Id == id);
        }
    }
}
