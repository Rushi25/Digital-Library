using DigitalLibrary.Areas.Admin.Models;
using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Admin.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    public class UsersToCategoryController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UsersToCategoryController(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        /// <summary>
        ///     Get list of users along with their assigned categories.
        /// </summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<UsersToCategoryModel>>(200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<UsersToCategoryModel>>> GetUsersToCategory()
        {
            var usersToCategory = await (from category in _dbContext.Category
                                  select new UsersToCategoryModel
                                  {
                                      CategoryId = category.Id,
                                      CategoryTitle = category.Title,
                                      Users = (from uc in _dbContext.UserCategory
                                               join user in _dbContext.Users
                                               on uc.UserId equals user.Id
                                               where uc.CategoryId == category.Id
                                               select new UserForAdminModel
                                               {
                                                   UserId = Guid.Parse(user.Id),
                                                   Name = user.FirstName + " " + user.LastName,
                                               }).ToList()
                                  }).ToListAsync();

            return Ok(usersToCategory);
        }

        /// <summary>
        ///     Stores the list of users for a category 
        /// </summary>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(201)]
        [ProducesResponseType<string>(400)]
        [ProducesResponseType(401)]
        public async Task<ActionResult> AddUsersToCategory([FromBody] UsersToCategoryModel usersToCategory)
        {
            if (ModelState.IsValid)
            {
                var userIds = usersToCategory.Users.Select(u => u.UserId.ToString()).ToHashSet();
                var categories = await _dbContext.UserCategory.Where(a => a.CategoryId == usersToCategory.CategoryId).ToListAsync();

                if (userIds.Count != 0)
                {
                    foreach(var catrgory in categories)
                    {
                        if (!userIds.Contains(catrgory.UserId))
                        {
                            _dbContext.Remove(catrgory);
                        }
                        else
                        {
                            usersToCategory.Users.Remove(usersToCategory.Users.First(a => a.UserId == Guid.Parse(catrgory.UserId)));
                        }
                    }

                    var usersCategory = new List<UserCategory>();
                    var categoryId = usersToCategory.CategoryId;

                    foreach (var user in usersToCategory.Users)
                    {
                        usersCategory.Add(new UserCategory
                        {
                            CategoryId = categoryId,
                            UserId = user.UserId.ToString()
                        });
                    }

                    if(usersCategory.Count > 0)
                    {
                        await _dbContext.UserCategory.AddRangeAsync(usersCategory);
                    }
                    await _dbContext.SaveChangesAsync();

                    return Created();

                }
                else
                {
                    if(categories.Count > 0)
                    {
                        _dbContext.RemoveRange(categories);
                        await _dbContext.SaveChangesAsync();
                    }
                    return Ok();
                }
            }
            return BadRequest("Please select correct category and user.");
        }
    }
}
