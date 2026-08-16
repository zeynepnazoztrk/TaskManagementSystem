namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;
using TaskManagement.API.Models;

public class AuthService(ApplicationDbContext context, IMapper mapper, IJwtService jwtService) : IAuthService
{
    public async Task<AuthDto> RegisterAsync(CreateUserDto dto)
    {
        var usernameTaken = await context.Users.AnyAsync(u => u.Username == dto.Username);
        if (usernameTaken)
        {
            throw new ValidationException($"Username '{dto.Username}' is already taken.");
        }

        var emailTaken = await context.Users.AnyAsync(u => u.Email == dto.Email);
        if (emailTaken)
        {
            throw new ValidationException($"Email '{dto.Email}' is already taken.");
        }

        var user = mapper.Map<User>(dto);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var token = jwtService.GenerateToken(user);
        return new AuthDto
        {
            User = mapper.Map<UserDto>(user),
            Token = token
        };
    }

    public async Task<AuthDto> LoginAsync(LoginDto dto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null)
        {
            throw new ValidationException("Invalid username or password.");
        }

        var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!passwordValid)
        {
            throw new ValidationException("Invalid username or password.");
        }

        var token = jwtService.GenerateToken(user);
        return new AuthDto
        {
            User = mapper.Map<UserDto>(user),
            Token = token
        };
    }
}