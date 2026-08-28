// Services/CommentService.cs
namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;
using TaskManagement.API.Models;

public class CommentService(ApplicationDbContext context, IMapper mapper) : ICommentService
{
    // GetAllAsync -- Task için Comment listesi
    public async Task<List<TaskCommentDto>> GetAllAsync(Guid taskId, Guid userId)
    {
        var taskExists = await context.Tasks.AnyAsync(t => t.Id == taskId && t.UserId == userId);
        if (!taskExists)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        var comments = await context.TaskComments.Where(c => c.TaskId == taskId).OrderBy(c => c.CreatedAt).ToListAsync();

        return mapper.Map<List<TaskCommentDto>>(comments);
    }

    // CreateAsync -- yeni Comment oluştur
    public async Task<TaskCommentDto> CreateAsync(Guid taskId, Guid userId, CreateCommentDto dto)
    {
        var taskExists = await context.Tasks.AnyAsync(t => t.Id == taskId && t.UserId == userId);
        if (!taskExists)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        var comment = new TaskComment
        {
            TaskId = taskId,
            UserId = userId,
            Comment = dto.Comment
        };

        context.TaskComments.Add(comment);
        await context.SaveChangesAsync();

        return mapper.Map<TaskCommentDto>(comment);
    }

    // DeleteAsync -- Comment sil
    public async Task DeleteAsync(Guid taskId, Guid commentId, Guid userId)
    {
        var comment = await context.TaskComments.FirstOrDefaultAsync(c => c.Id == commentId && c.TaskId == taskId);
        if (comment is null)
        {
            throw new NotFoundException($"Comment with id {commentId} not found.");
        }

        context.TaskComments.Remove(comment);
        await context.SaveChangesAsync();
    }
}