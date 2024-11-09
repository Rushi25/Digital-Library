using DigitalLibrary.Context.Entities;
using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Areas.Member.Models
{
    public class UserSelectedCategory
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public Category Category { get; set; }
        [Required]
        public bool IsSelected { get; set; }
    }
}
