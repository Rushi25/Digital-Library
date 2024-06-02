using DigitalLibrary.Modules.Authentication.Entities;
using DigitalLibrary.Modules.Authentication.Models;

namespace DigitalLibrary.Modules.Authentication.Services.Interfaces
{
    public interface IUserService
    {
        Task<(string, string)> LogInAndGenerateTokenAsync(User user);
        Task<TokenModel> RefreshAsync(TokenModel model);
        Task RegisterAsync(RegisterModel model);
    }
}