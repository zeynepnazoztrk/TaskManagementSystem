namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateCategoryDto
{
    [MaxLength(100)]
    public string? Name {get; set;}

    public string? Description {get; set;}

    [MaxLength(7)]
    public string? Color {get; set;}
}