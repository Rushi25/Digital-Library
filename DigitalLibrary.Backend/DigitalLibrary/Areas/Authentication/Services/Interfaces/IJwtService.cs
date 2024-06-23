using DigitalLibrary.Context.Entities;

namespace DigitalLibrary.Areas.Authentication.Services.Interfaces
{
    public interface IJwtService
    {
        string CreateJwt(User user);
    }
}