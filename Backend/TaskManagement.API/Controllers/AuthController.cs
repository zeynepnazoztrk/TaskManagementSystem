namespace TaskManagement.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService, IUserService userService) : ControllerBase
{
    // Register
    [HttpPost("register")]
    public async Task<ActionResult<AuthDto>> Register(CreateUserDto dto)
    {
        var result = await authService.RegisterAsync(dto);
        return Ok(result);
    }

    // Login
    [HttpPost("login")]
    public async Task<ActionResult<AuthDto>> Login(LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);
        return Ok(result);
    }

    // View Profile
    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<UserDto>> Profile()
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await userService.GetAsync(userId);
        return Ok(user);
    }
}