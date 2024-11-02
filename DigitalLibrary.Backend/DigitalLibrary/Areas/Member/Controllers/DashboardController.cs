using DigitalLibrary.Areas.Member.Models;
using DigitalLibrary.Context;
using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLibrary.Areas.Member.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        public DashboardController(AppDbContext dbContext, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        ///<summary>
        ///     Get users assinged category and category items
        ///</summary>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType<IEnumerable<GroupedCategoryItemsByCategoryModel>>(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public async Task<ActionResult<IEnumerable<GroupedCategoryItemsByCategoryModel>>> GetUsersCategories()
        {
            
            IEnumerable<CategoryItemDetailsModel> categoryItemDeatilsModels = null;
            IEnumerable<GroupedCategoryItemsByCategoryModel> groupedCategoryItemsByCategoryModels = null;

            if(User.Identity?.IsAuthenticated == true)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    categoryItemDeatilsModels = await GetCategoryItemDetailsForUser(user.Id);
                    groupedCategoryItemsByCategoryModels = GetGroupedCategoryItemsByCategories(categoryItemDeatilsModels);

                    return Ok(groupedCategoryItemsByCategoryModels);
                }
                return Forbid("Something went wrong, Please login again.");
            }

            return Unauthorized("Please login to access this service");
        }

        private IEnumerable<GroupedCategoryItemsByCategoryModel> GetGroupedCategoryItemsByCategories(IEnumerable<CategoryItemDetailsModel> categoryItemDetailsModels)
        {
            return from item in categoryItemDetailsModels
                   group item by item.CategoryId into g
                   select new GroupedCategoryItemsByCategoryModel
                   {
                       Id = g.Key,
                       Title = g.Select(c => c.CategoryTitle).FirstOrDefault(),
                       Items = g
                   };
        }

        private async Task<IEnumerable<CategoryItemDetailsModel>> GetCategoryItemDetailsForUser(string userId)
        {
            return await (from catItem in _dbContext.CategoryItems
                    join category in _dbContext.Categories
                    on catItem.CategoryId equals category.Id
                    join content in _dbContext.Contents
                    on catItem.Id equals content.CategoryItem.Id
                    join userCat in _dbContext.UserCategories
                    on category.Id equals userCat.CategoryId
                    join mediaType in _dbContext.MediaTypes
                    on catItem.MediaTypeId equals mediaType.Id
                    where userCat.UserId == userId
                    select new CategoryItemDetailsModel
                    {
                        CategoryId = category.Id,
                        CategoryTitle = category.Title,
                        CategoryItemId = catItem.Id,
                        CategoryItemTitle = catItem.Title,
                        CategoryItemDescription = catItem.Description,
                        MediaImagePath = mediaType.ThumbnailImagePath
                    }).ToListAsync();
        }
    }
}
