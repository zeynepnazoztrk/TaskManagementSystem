namespace TaskManagement.API.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class CategoriesController(ICategoryService categoryService) : ControllerBase
{
    // User için Category listesi
    [HttpGet]
    public async Task<ActionResult<List<CategoryDto>>> GetAll()
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var categories = await categoryService.GetAllAsync(userId);
        return Ok(categories);
    }

    // Category bilgileri
    [HttpGet("{categoryId}")]
    public async Task<ActionResult<CategoryDto>> Get(Guid categoryId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var category = await categoryService.GetAsync(categoryId, userId);
        return Ok(category);
    }

    // Category bilgilerini güncelle
    [HttpPut("{categoryId}")]
    public async Task<ActionResult<CategoryDto>> Update(Guid categoryId, UpdateCategoryDto dto)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var category = await categoryService.UpdateAsync(categoryId, userId, dto);
        return Ok(category);
    }

    // Yeni Category oluştur
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var category = await categoryService.CreateAsync(userId, dto);
        return Ok(category);

    }

    // Cateory sil
    [HttpDelete("{categoryId}")]
    public async Task<IActionResult> Delete(Guid categoryId)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await categoryService.DeleteAsync(categoryId, userId);
        return NoContent();
    }
}