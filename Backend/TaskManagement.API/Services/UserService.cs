namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;

public class UserService(ApplicationDbContext context, IMapper mapper) : IUserService
{
    // GetAsync -- User bilgileri
    public async Task<UserDto> GetAsync(Guid userId)
    {
        var user = await context.Users.FindAsync(userId);
        if (user == null)
        {
            throw new NotFoundException($"User with id {userId} not found.");
        }

        return mapper.Map<UserDto>(user);
    }

    // UpdateAsync -- User bilgilerini güncelle
    public async Task<UserDto> UpdateAsync(Guid userId, UpdateUserDto dto)
    {
        var user = await context.Users.FindAsync(userId);
        if (user == null)
        {
            throw new NotFoundException($"User with id {userId} not found.");
        }

        if (dto.Username != null)
        {
            var usernameTaken = await context.Users.AnyAsync(u => u.Username == dto.Username && u.Id != userId);
            if (usernameTaken)
            {
                throw new ValidationException($"Username '{dto.Username}' is already taken.");
            }
        }

        mapper.Map(dto, user);
        user.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return mapper.Map<UserDto>(user);
    }
}