using System.Linq;

namespace DigitalLibrary.Areas.Member.Models
{
    public class GroupedCategoryItemsByCategoryModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IGrouping<int, CategoryItemDetailsModel> Items { get; set; }
    }
}
