namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface IAttachmentService
{
    Task<List<TaskAttachmentDto>> GetAllAsync(Guid taskId, Guid userId);
    Task<TaskAttachmentDto> UploadAsync(Guid taskId, Guid userId, IFormFile file);
    Task DeleteAsync(Guid taskId, Guid attachmentId, Guid userId);
}