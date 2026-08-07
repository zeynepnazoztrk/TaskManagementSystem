namespace TaskManagement.API.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateUserDto
{
    [MaxLength(50)]
    public string? Username {get; set;}

    [EmailAddress, MaxLength(100)]
    public string? Email {get; set;}

    [MaxLength(50)]
    public string? FirstName {get; set;}

    [MaxLength(50)]
    public string? LastName {get; set;}
}