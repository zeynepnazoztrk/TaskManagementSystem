namespace TaskManagement.API.Services;

using TaskManagement.API.DTOs;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAllAsync(Guid userId);
    Task<CategoryDto> GetAsync(Guid categoryId, Guid userId);
    Task<CategoryDto> UpdateAsync(Guid categoryId, Guid userId, UpdateCategoryDto dto);
    Task<CategoryDto> CreateAsync(Guid userId, CreateCategoryDto dto);
    Task DeleteAsync(Guid categoryId, Guid userId);
}