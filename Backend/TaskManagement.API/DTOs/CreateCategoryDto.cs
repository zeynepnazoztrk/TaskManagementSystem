namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class CreateCategoryDto
{
    [Required, MaxLength(100)]
    public string Name {get; set;} = string.Empty;

    public string? Description {get; set;}

    [Required, MaxLength(7)]
    public string Color {get; set;} = "#4960a4";
}