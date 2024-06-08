using DigitalLibrary.Modules.Authentication.Entities;

namespace DigitalLibrary.Modules.Authentication.Services.Interfaces
{
    public interface IJwtService
    {
        string CreateJwt(User user);
    }
}