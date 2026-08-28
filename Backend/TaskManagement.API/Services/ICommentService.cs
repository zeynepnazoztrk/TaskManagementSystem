namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface ICommentService
{
    Task<List<TaskCommentDto>> GetAllAsync(Guid taskId, Guid userId);
    Task<TaskCommentDto> CreateAsync(Guid taskId, Guid userId, CreateCommentDto dto);
    Task DeleteAsync(Guid taskId, Guid commentId, Guid userId);
}