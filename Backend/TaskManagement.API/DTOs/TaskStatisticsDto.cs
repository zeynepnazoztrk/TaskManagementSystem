namespace TaskManagement.API.DTOs;

public class TaskStatisticsDto
{
    public int TotalTasks {get; set;}
    public int PendingCount {get; set;}
    public int InProgressCount {get; set;}
    public int CompletedCount {get; set;}
    public int CancelledCount {get; set;}
}