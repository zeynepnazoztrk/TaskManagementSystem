namespace TaskManagement.API.DTOs;

public class AuthDto
{
    public UserDto User { get; set; } = null!;
    public string Token { get; set; } = string.Empty;
}