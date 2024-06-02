using DigitalLibrary.Modules.Authentication.Entities;

namespace DigitalLibrary.Modules.Authentication.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task AddUserAsync(User user);
        Task<bool> CheckEmailAlreadyExistsAsync(string email);
        Task<bool> CheckUsernameAlreadyExistsAsync(string username);
        Task<User> GetUserAsync(string username);
        Task<bool> IsRefreshTokenAlreadyPresentAsync(string token);
        Task SaveChangesAsync();
    }
}