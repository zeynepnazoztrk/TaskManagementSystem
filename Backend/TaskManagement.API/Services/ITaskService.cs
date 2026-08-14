namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface ITaskService
{
    Task<List<TaskItemDto>> GetAllAsync(Guid userId);
    Task<TaskItemDto> GetAsync(Guid taskId, Guid userId);
    Task<TaskItemDto> UpdateAsync(Guid taskId, Guid userId, UpdateTaskDto dto);
    Task<TaskItemDto> CreateAsync(Guid userId, CreateTaskDto dto);
    Task DeleteAsync(Guid taskId, Guid userId);
}