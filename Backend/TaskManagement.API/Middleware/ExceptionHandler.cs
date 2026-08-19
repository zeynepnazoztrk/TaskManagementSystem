namespace TaskManagement.API.Middleware;

using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using TaskManagement.API.Exceptions;

public class ExceptionHandler(ILogger<ExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var statusCode = exception switch
        {
            NotFoundException => HttpStatusCode.NotFound,
            ValidationException => HttpStatusCode.BadRequest,
            _ => HttpStatusCode.InternalServerError
        };

        logger.LogError(exception, "Unhandled exception occurred: {Message}", exception.Message);

        httpContext.Response.StatusCode = (int)statusCode;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(new
        {
            error = exception.Message,
            statusCode = (int)statusCode
        }, cancellationToken);

        return true;
    }
}