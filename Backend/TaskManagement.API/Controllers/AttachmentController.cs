namespace TaskManagement.API.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

[ApiController]
[Route("api/tasks/{taskId}/attachments")]
[Authorize]

public class AttachmentController(IAttachmentService attachmentService) : ControllerBase
{
    // Task için Attachment listesi
    [HttpGet]
    public async Task<ActionResult<List<TaskAttachmentDto>>> GetAll(Guid taskId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var attachments = await attachmentService.GetAllAsync(taskId, userId);
        return Ok(attachments);
    }

    // yeni Attachment
    [HttpPost]
    public async Task<ActionResult<TaskAttachmentDto>> Upload(Guid taskId, IFormFile file)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var attachment = await attachmentService.UploadAsync(taskId, userId, file);
        return Ok(attachment);
    }

    // Attachment sil
    [HttpDelete("{attachmentId}")]
    public async Task<IActionResult> Delete(Guid taskId, Guid attachmentId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await attachmentService.DeleteAsync(taskId, attachmentId, userId);
        return NoContent();
    }
}