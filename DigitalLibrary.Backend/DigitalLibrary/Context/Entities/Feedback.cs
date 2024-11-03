using System;
using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Context.Entities
{
    public class Feedback
    {        
        public int Id { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
