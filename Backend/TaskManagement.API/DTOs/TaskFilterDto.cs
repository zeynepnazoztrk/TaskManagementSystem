namespace TaskManagement.API.DTOs;

public class TaskFilterDto
{
    public int? Status {get; set;}
    public int? Priority {get; set;}
    public Guid? CategoryId {get; set;}
    public string? SearchTerm {get; set;}
    public DateTime? DueDate {get; set;}
}