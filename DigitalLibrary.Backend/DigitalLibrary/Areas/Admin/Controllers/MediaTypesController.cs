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
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class MediaTypesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MediaTypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MediaTypes
        /// <summary>
        ///     Get list of Media type
        /// </summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<MediaType>>(200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<MediaType>>> GetMediaType()
        {
            return await _context.MediaType.ToListAsync();
        }

        // GET: api/MediaTypes/5
        /// <summary>
        ///     Get media type of id.
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType<MediaType>(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<MediaType>> GetMediaType(int id)
        {
            var mediaType = await _context.MediaType.FindAsync(id);

            if (mediaType == null)
            {
                return NotFound();
            }

            return mediaType;
        }

        // PUT: api/MediaTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        ///     Update media type of id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="mediaType"></param>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutMediaType(int id, MediaType mediaType)
        {
            if (id != mediaType.Id)
            {
                return BadRequest();
            }

            _context.Entry(mediaType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediaTypeExists(id))
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

        // POST: api/MediaTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        ///     Add new media type
        /// </summary>
        /// <param name="mediaType"></param>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType<MediaType>(201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<MediaType>> PostMediaType(MediaType mediaType)
        {
            await _context.MediaType.AddAsync(mediaType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMediaType", new { id = mediaType.Id }, mediaType);
        }

        // DELETE: api/MediaTypes/5
        /// <summary>
        ///     Delete media type of id.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteMediaType(int id)
        {
            var mediaType = await _context.MediaType.FindAsync(id);
            if (mediaType == null)
            {
                return NotFound();
            }

            _context.MediaType.Remove(mediaType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MediaTypeExists(int id)
        {
            return _context.MediaType.Any(e => e.Id == id);
        }
    }
}
