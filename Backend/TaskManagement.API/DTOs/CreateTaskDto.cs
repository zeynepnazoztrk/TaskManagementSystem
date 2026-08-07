namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class CreateTaskDto
{
    [Required, MaxLength(200)]
    public string Title {get; set;} = string.Empty;

    public string? Description {get; set;}

    [Required]
    public int Priority {get; set;}

    public DateTime? DueDate {get; set;}
    public Guid? CategoryId {get; set;}
}