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
    // GetAllAsync -- User için Task listesi + filtreleme + sayfalama
    public async Task<PagedResultDto<TaskItemDto>> GetAllAsync(Guid userId, TaskFilterDto dto)
    {
        var allTasks = context.Tasks.Include(t => t.Category).Where(t => t.UserId == userId);

        // by status
        if (dto.Status.HasValue)
        {
            allTasks = allTasks.Where(t => t.Status == (TaskItemStatus)dto.Status.Value);
        }

        // by priority
        if (dto.Priority.HasValue)
        {
            allTasks = allTasks.Where(t => t.Priority == (Priority)dto.Priority.Value);
        }
        
        // by category
        if (dto.CategoryId.HasValue)
        {
            allTasks = allTasks.Where(t => t.CategoryId == dto.CategoryId.Value);
        }

        // by title
        if (!string.IsNullOrWhiteSpace(dto.SearchTerm))
        {
            allTasks = allTasks.Where(t => t.Title.Contains(dto.SearchTerm) ||
                (t.Description != null && t.Description.Contains(dto.SearchTerm)));
        }

        // by due date
        if (dto.DueDate.HasValue)
        {
            allTasks = allTasks.Where(t => t.DueDate.HasValue && t.DueDate.Value.Date == dto.DueDate.Value.Date);
        }

        var totalCount = await allTasks.CountAsync();

        var tasks = await allTasks.Skip((dto.Page - 1) * dto.PageSize).Take(dto.PageSize).ToListAsync();

        return new PagedResultDto<TaskItemDto>
        {
            Items = mapper.Map<List<TaskItemDto>>(tasks),
            TotalCount = totalCount,
            Page = dto.Page,
            PageSize = dto.PageSize
        };
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

        if (dto.Priority.HasValue)
        {
            task.Priority = (Priority)dto.Priority.Value;
        }

        if (dto.Status.HasValue)
        {
            task.Status = (TaskItemStatus)dto.Status.Value;
            task.CompletedAt = task.Status == TaskItemStatus.Completed ? DateTime.UtcNow : null;
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

    // GetStatisticsAsync -- Task istatistiklerini listele
    public async Task<TaskStatisticsDto> GetStatisticsAsync(Guid userId)
    {
        var tasks = await context.Tasks
            .Where(t => t.UserId == userId)
            .ToListAsync();

        return new TaskStatisticsDto
        {
            TotalTasks = tasks.Count,
            PendingCount = tasks.Count(t => t.Status == TaskItemStatus.Pending),
            InProgressCount = tasks.Count(t => t.Status == TaskItemStatus.InProgress),
            CompletedCount = tasks.Count(t => t.Status == TaskItemStatus.Completed),
            CancelledCount = tasks.Count(t => t.Status == TaskItemStatus.Cancelled)
        };
    }

    // GetOverdueAsync -- Vadesi geçen görevleri listele
    public async Task<List<TaskItemDto>> GetOverdueAsync(Guid userId)
    {
        var now = DateTime.UtcNow;
        var tasks = await context.Tasks
            .Include(t => t.Category)
            .Where(t => t.UserId == userId
                && t.DueDate.HasValue
                && t.DueDate.Value < now
                && t.Status != TaskItemStatus.Completed
                && t.Status != TaskItemStatus.Cancelled)
            .ToListAsync();

        return mapper.Map<List<TaskItemDto>>(tasks);
    }
}