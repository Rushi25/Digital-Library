using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Areas.Admin.Models
{
    public class UsersToCategoryModel
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string CategoryTitle { get; set; }

        [Required]
        public ICollection<UserForAdminModel> Users { get; set; }
    }
}
