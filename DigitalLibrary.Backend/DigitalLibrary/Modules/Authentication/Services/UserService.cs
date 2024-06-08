using DigitalLibrary.Constants;
using DigitalLibrary.Enums;
using DigitalLibrary.Helpers;
using DigitalLibrary.Modules.Authentication.Entities;
using DigitalLibrary.Modules.Authentication.Models;
using DigitalLibrary.Modules.Authentication.Repositories.Interfaces;
using DigitalLibrary.Modules.Authentication.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DigitalLibrary.Modules.Authentication.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task RegisterAsync(RegisterModel model)
        {
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Username = model.Username,
                Role = (int)UserRole.User,
                Token = ""
            };
            user.Password = PasswordHasher.HashPassword(model.Password);
            await _repository.AddUserAsync(user);
        }

        public async Task<(string, string)> LogInAndGenerateTokenAsync(User user)
        {
            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = await CreateRefreshTokenAsync();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            await _repository.SaveChangesAsync();
            return (newAccessToken, newRefreshToken);
        }

        public async Task<TokenModel> RefreshAsync(TokenModel model)
        {
            var principal = GetPrincipleFromExpiredToken(model.AccessToken);
            var username = principal.Identity.Name;

            var user = await _repository.GetUserAsync(username);
            if (user is null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return null;

            var newAccessToken = CreateJwt(user);
            var newRefreshToken = await CreateRefreshTokenAsync();
            user.RefreshToken = newRefreshToken;
            await _repository.SaveChangesAsync();
            return new TokenModel
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            };
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(DigitalLibraryConstants.JwtKey);
            var identity = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddSeconds(10),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private async Task<string> CreateRefreshTokenAsync()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            if (await _repository.IsRefreshTokenAlreadyPresentAsync(refreshToken))
            {
                return await CreateRefreshTokenAsync();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(DigitalLibraryConstants.JwtKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is Invalid Token");
            return principal;

        }
    }
}
