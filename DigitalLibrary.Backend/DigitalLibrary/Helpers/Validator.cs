using DigitalLibrary.Modules.Authentication.Entities;
using DigitalLibrary.Modules.Authentication.Models;
using DigitalLibrary.Modules.Authentication.Repositories.Interfaces;
using System.Text;
using System.Text.RegularExpressions;

namespace DigitalLibrary.Helpers
{
    public class Validator
    {
        private readonly IUserRepository _userRepository;
        public Validator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string> ValidateAsync(RegisterModel registerModel)
        {
            if(await _userRepository.CheckEmailAlreadyExistsAsync(registerModel.Email))
            {
                return "Email id already exists";
            }
            if(await _userRepository.CheckUsernameAlreadyExistsAsync(registerModel.Username))
            {
                return "Username already taken";
            }
            return CheckPasswordStrength(registerModel.Password);
        }

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special charcter" + Environment.NewLine);
            return sb.ToString();
        }

        public async Task<(User user, string message)> ValidateLogInAsync(LoginModel model)
        {
            var user = await _userRepository.GetUserAsync(model.Username);
            if(user == null)
            {
                return (null, "Incorrect username.");
            }
            if (!PasswordHasher.VerifyPassword(model.Password, user.Password))
            {
                return (null, "Incorrect password.");
            }
            return (user, null);
        }
    }
}
