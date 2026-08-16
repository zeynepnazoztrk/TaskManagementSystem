namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface IAuthService
{
    Task<AuthDto> RegisterAsync(CreateUserDto dto);
    Task<AuthDto> LoginAsync(LoginDto dto);
}