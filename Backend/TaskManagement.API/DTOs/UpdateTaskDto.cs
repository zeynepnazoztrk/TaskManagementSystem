namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateTaskDto
{
    [MaxLength(200)]
    public string? Title {get; set;}

    public string? Description {get; set;}
    public int? Priority {get; set;}
    public int? Status {get; set;} 
    public DateTime? DueDate {get; set;}
    public Guid? CategoryId {get; set;}
}