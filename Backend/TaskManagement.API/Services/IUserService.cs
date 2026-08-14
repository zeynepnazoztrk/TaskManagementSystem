namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface IUserService
{
    Task<UserDto> GetAsync(Guid id);
    Task<UserDto> UpdateAsync(Guid id, UpdateUserDto dto);
}