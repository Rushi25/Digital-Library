using System;
using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Areas.Admin.Models
{
    public class UserForAdminModel
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
