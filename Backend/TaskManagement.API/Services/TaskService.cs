namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;
using TaskManagement.API.Models;
using TaskManagement.API.Models.Enums;

public class TaskService(ApplicationDbContext context, IMapper mapper) : ITaskService
{
    // GetAllAsync -- User için Task listesi (TaskFilterDto)
    public async Task<List<TaskItemDto>> GetAllAsync(Guid userId)
    {
        var tasks = await context.Tasks.Where(t => t.UserId == userId).Include(t => t.Category).ToListAsync();
        
        return mapper.Map<List<TaskItemDto>>(tasks);
    }

    // GetAsync -- Task bilgileri
    public async Task<TaskItemDto> GetAsync(Guid taskId, Guid userId)
    {
        var task = await context.Tasks.Include(t => t.Category).FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
        if (task == null)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        return mapper.Map<TaskItemDto>(task);
    }

    // UpdateAsync -- Task bilgilerini güncelle
    public async Task<TaskItemDto> UpdateAsync(Guid taskId, Guid userId, UpdateTaskDto dto)
    {
        var task = await context.Tasks.Include(t => t.Category).FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
        if (task == null)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        mapper.Map(dto, task);

        if (dto.Status != null)
        {
            if (task.Status == TaskItemStatus.Completed)
            {
                task.CompletedAt = DateTime.UtcNow;
            }
            else
            {
                task.CompletedAt = null;
            }
        }
        task.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return mapper.Map<TaskItemDto>(task);
    }

    // CreateAsync -- yeni Task oluştur
    public async Task<TaskItemDto> CreateAsync(Guid userId, CreateTaskDto dto)
    {
        var task = mapper.Map<TaskItem>(dto);
        task.UserId = userId;
        
        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        return mapper.Map<TaskItemDto>(task);
    }

    // DeleteAsync -- Task sil
    public async Task DeleteAsync(Guid taskId, Guid userId)
    {
        var task = await context.Tasks.Include(t => t.Category).FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
        if (task == null)
        {
            throw new NotFoundException($"Task with id {taskId} not found.");
        }

        context.Tasks.Remove(task);
        await context.SaveChangesAsync();
    }
}