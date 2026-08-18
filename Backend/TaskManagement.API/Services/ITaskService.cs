namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface ITaskService
{
    Task<PagedResultDto<TaskItemDto>> GetAllAsync(Guid userId, TaskFilterDto dto);
    Task<TaskItemDto> GetAsync(Guid taskId, Guid userId);
    Task<TaskItemDto> UpdateAsync(Guid taskId, Guid userId, UpdateTaskDto dto);
    Task<TaskItemDto> CreateAsync(Guid userId, CreateTaskDto dto);
    Task DeleteAsync(Guid taskId, Guid userId);
    Task<TaskStatisticsDto> GetStatisticsAsync(Guid userId);
    Task<List<TaskItemDto>> GetOverdueAsync(Guid userId);
}