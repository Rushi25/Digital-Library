using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Areas.Authentication.Models
{
    public class RegisterModel
    {
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "First name must be at least {2}, and maximun {1} characters")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Last name must be at least {2}, and maximun {1} characters")]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 6, ErrorMessage = "Password must be at least {2}, and maximun {1} characters")]
        public string Password { get; set; }

    }
}
