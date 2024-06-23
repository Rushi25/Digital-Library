using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalLibrary.Context.Entities
{
    public class User : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        public DateTime DateCreated { get; set; } = DateTime.Now;
        
        [ForeignKey("UserId")]
        public virtual ICollection<UserCategory> UserCategory { get; set; }
    }
}
