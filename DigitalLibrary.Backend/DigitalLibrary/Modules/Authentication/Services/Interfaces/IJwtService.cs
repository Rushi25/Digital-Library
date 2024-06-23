using DigitalLibrary.Context.Entities;

namespace DigitalLibrary.Modules.Authentication.Services.Interfaces
{
    public interface IJwtService
    {
        string CreateJwt(User user);
    }
}