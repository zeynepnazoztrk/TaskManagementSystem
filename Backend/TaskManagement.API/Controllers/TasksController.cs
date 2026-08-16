namespace TaskManagement.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class TasksController(ITaskService taskService) : ControllerBase
{
    // User için Task listesi
    [HttpGet]
    public async Task<ActionResult<List<TaskItemDto>>> GetAll()
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var tasks = await taskService.GetAllAsync(userId);
        return Ok(tasks);
    }

    // Task bilgileri
    [HttpGet("{taskId}")]
    public async Task<ActionResult<TaskItemDto>> Get(Guid taskId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = await taskService.GetAsync(taskId, userId);
        return Ok(task);
    }

    // Task bilgilerini güncelle
    [HttpPut("{taskId}")]
    public async Task<ActionResult<TaskItemDto>> Update(Guid taskId, UpdateTaskDto dto)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = await taskService.UpdateAsync(taskId, userId, dto);
        return Ok(task);
    }

    // Yeni Task oluştur
    [HttpPost]
    public async Task<ActionResult<TaskItemDto>> Create(CreateTaskDto dto)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = await taskService.CreateAsync(userId, dto);
        return Ok(task);
    }

    // Task sil
    [HttpDelete("{taskId}")]
    public async Task<IActionResult> Delete(Guid taskId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await taskService.DeleteAsync(taskId, userId);
        return NoContent();
    }
}