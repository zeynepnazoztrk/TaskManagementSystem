namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateCategoryDto
{
    [MaxLength(100)]
    public string Name {get; set;} = string.Empty;

    public string? Description {get; set;}

    [MaxLength(7)]
    public string Color {get; set;} = "#007bff";
}