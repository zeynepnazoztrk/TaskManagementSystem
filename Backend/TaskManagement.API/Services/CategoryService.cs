namespace TaskManagement.API.Services;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Exceptions;
using TaskManagement.API.Models;

public class CategoryService(ApplicationDbContext context, IMapper mapper) : ICategoryService
{
    // GetAllAsync -- User için Category listesi
    public async Task<List<CategoryDto>> GetAllAsync(Guid userId)
    {
        var categories = await context.Categories.Where(c => c.UserId == userId).ToListAsync();
        
        return mapper.Map<List<CategoryDto>>(categories);
    }

    // GetAsync -- Category bilgileri
    public async Task<CategoryDto> GetAsync(Guid categoryId, Guid userId)
    {
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId && c.UserId == userId);
        if (category == null)
        {
            throw new NotFoundException($"Category with id {categoryId} not found.");
        }

        return mapper.Map<CategoryDto>(category);
    }

    // UpdateAsync -- Category bilgilerini güncelle
    public async Task<CategoryDto> UpdateAsync(Guid categoryId, Guid userId, UpdateCategoryDto dto)
    {
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId && c.UserId == userId);
        if (category == null)
        {
            throw new NotFoundException($"Category with id {categoryId} not found.");
        }

        mapper.Map(dto, category);
        await context.SaveChangesAsync();

        return mapper.Map<CategoryDto>(category);
    }

    // CreateAsync -- yeni Category oluştur
    public async Task<CategoryDto> CreateAsync(Guid userId, CreateCategoryDto dto)
    {
        var category = mapper.Map<Category>(dto);
        category.UserId = userId;
        
        context.Categories.Add(category);
        await context.SaveChangesAsync();

        return mapper.Map<CategoryDto>(category);
    }

    // DeleteAsync -- Cateory sil
    public async Task DeleteAsync(Guid categoryId, Guid userId)
    {
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId && c.UserId == userId);
        if (category == null)
        {
            throw new NotFoundException($"Category with id {categoryId} not found.");
        }

        context.Categories.Remove(category);
        await context.SaveChangesAsync();
    }
}