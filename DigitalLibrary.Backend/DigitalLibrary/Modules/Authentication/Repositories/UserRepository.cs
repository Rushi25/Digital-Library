using DigitalLibrary.Context;
using DigitalLibrary.Modules.Authentication.Entities;
using DigitalLibrary.Modules.Authentication.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DigitalLibrary.Modules.Authentication.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> CheckEmailAlreadyExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(a => a.Email == email);
        }

        public async Task<bool> CheckUsernameAlreadyExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(a => a.Username == username);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(a => a.Username == username);
        }

        public async Task<bool> IsRefreshTokenAlreadyPresentAsync(string token)
        {
            return await _context.Users.AnyAsync(a => a.RefreshToken == token);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
