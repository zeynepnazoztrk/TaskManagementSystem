namespace TaskManagement.API.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

[ApiController]
[Route("api/tasks/{taskId}/comments")]
[Authorize]

public class CommentController(ICommentService commentService) : ControllerBase
{
    // Task için Comment listesi
    [HttpGet]
    public async Task<ActionResult<List<TaskCommentDto>>> GetAll(Guid taskId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var comments = await commentService.GetAllAsync(taskId, userId);
        return Ok(comments);
    }

    // yeni Comment
    [HttpPost]
    public async Task<ActionResult<TaskCommentDto>> Create(Guid taskId, CreateCommentDto dto)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var comment = await commentService.CreateAsync(taskId, userId, dto);
        return Ok(comment);
    }

    // Comment sil
    [HttpDelete("{commentId}")]
    public async Task<IActionResult> Delete(Guid taskId, Guid commentId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await commentService.DeleteAsync(taskId, commentId, userId);
        return NoContent();
    }
}