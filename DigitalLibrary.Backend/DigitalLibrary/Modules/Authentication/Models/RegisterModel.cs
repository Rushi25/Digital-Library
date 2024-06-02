using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Modules.Authentication.Models
{
    public class RegisterModel
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }

    }
}
