namespace TaskManagement.API.Services;

using TaskManagement.API.Models;

public interface IJwtService
{
    string GenerateToken(User user);
}