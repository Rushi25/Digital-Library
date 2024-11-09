using DigitalLibrary.Areas.Member.Models;
using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Member.Controllers
{
    [Authorize]
    [Route("api/member/[controller]")]
    [ApiController]
    public class ChooseCategoryController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public ChooseCategoryController(AppDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        /// <summary>
        ///     Get list of categories along with user selected categories
        /// </summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<UserSelectedCategory>>(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public async Task<ActionResult<IEnumerable<UserSelectedCategory>>> GetCategoryToChooseForUserAsync()
        {
            if (User.Identity?.IsAuthenticated != true)
                return Unauthorized("Please login to access this service");

            var user = await _userManager.GetUserAsync(User).ConfigureAwait(false);
            if (user == null)
                return Forbid("Something went wrong, Please login again.");

            var userCategories = _dbContext.UserCategories
                                                 .Where(a => a.UserId == user.Id)
                                                 .Select(a => a.CategoryId)
                                                 .ToHashSet();

            var userSelectedCategories = await _dbContext.Categories
                                                         .Select(category => new UserSelectedCategory
                                                         {
                                                             UserId = user.Id,
                                                             Category = category,
                                                             IsSelected = userCategories.Contains(category.Id)
                                                         })
                                                         .ToListAsync();

            return Ok(userSelectedCategories);
        }


        /// <summary>
        ///     Saves the category for user
        /// </summary>
        /// <param name="userSelectedCategories">Categories to select for user</param>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public async Task<ActionResult> PostUserCategorySelection([FromBody] [Required] IEnumerable<UserSelectedCategory> userSelectedCategories)
        {
            if (User.Identity?.IsAuthenticated != true)
                return Unauthorized("Please login to access this service");

            var user = await _userManager.GetUserAsync(User).ConfigureAwait(false);
            if (user == null)
                return Forbid("Something went wrong, Please login again.");

            var userCategories = await _dbContext.UserCategories
                                                 .Where(a => a.UserId == user.Id)
                                                 .ToListAsync();

            var categoriesToAdd = new List<UserCategory>();
            var categoriesToRemove = new List<UserCategory>();

            foreach (var category in userSelectedCategories)
            {
                if (category.UserId != user.Id)
                    return BadRequest("Invalid data");

                var existingCategory = userCategories.Find(a => a.CategoryId == category.Category.Id);

                if (category.IsSelected && existingCategory == default)
                {
                    // If selected but not yet in DB, add it
                    categoriesToAdd.Add(new UserCategory { UserId = user.Id, CategoryId = category.Category.Id });
                }
                else if (!category.IsSelected && existingCategory != default)
                {
                    // If unselected and exists in DB, remove it
                    categoriesToRemove.Add(existingCategory);
                }
            }

            // Apply additions and deletions in batch
            if (categoriesToAdd.Count != 0)
                await _dbContext.AddRangeAsync(categoriesToAdd);

            if (categoriesToRemove.Count != 0)
                _dbContext.RemoveRange(categoriesToRemove);

            await _dbContext.SaveChangesAsync();

            return Ok("User categories updated successfully.");
        }

    }
}
