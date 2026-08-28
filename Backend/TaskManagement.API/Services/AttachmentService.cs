namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;
using TaskManagement.API.Models;

public class AttachmentService(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment env) : IAttachmentService
{
    // GetAllAsync -- Task için Attachment listesi
    public async Task<List<TaskAttachmentDto>> GetAllAsync(Guid taskId, Guid userId)
    {
        var taskExists = await context.Tasks.AnyAsync(t => t.Id == taskId && t.UserId == userId);
        if (!taskExists)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        var attachments = await context.TaskAttachments.Where(a => a.TaskId == taskId).ToListAsync();

        return mapper.Map<List<TaskAttachmentDto>>(attachments);
    }

    // UploadAsync -- yeni Attachment oluştur
    public async Task<TaskAttachmentDto> UploadAsync(Guid taskId, Guid userId, IFormFile file)
    {
        var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
        if (task == null)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        var uploadsFolder = Path.Combine(env.ContentRootPath, "Uploads");
        Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var attachment = new TaskAttachment
        {
            TaskId = taskId,
            FileName = file.FileName,
            FilePath = filePath,
            FileSize = file.Length,
            ContentType = file.ContentType
        };

        context.TaskAttachments.Add(attachment);
        await context.SaveChangesAsync();

        return mapper.Map<TaskAttachmentDto>(attachment);
    }

    // DeleteAsync -- Attachment sil
    public async Task DeleteAsync(Guid taskId, Guid attachmentId, Guid userId)
    {
        var attachment = await context.TaskAttachments.FirstOrDefaultAsync(a => a.Id == attachmentId && a.TaskId == taskId);
        if (attachment is null)
        {
            throw new NotFoundException($"Attachment with id {attachmentId} not found.");
        }

        if (File.Exists(attachment.FilePath))
        {
            File.Delete(attachment.FilePath);
        }

        context.TaskAttachments.Remove(attachment);
        await context.SaveChangesAsync();
    }
}