using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware {
    public class ErrorHandlingMiddleware {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware (RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger) {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke (HttpContext context) {
            try {
                await _next (context); // if there is no exception, pass it to the next middleware
            } catch (Exception ex) {
                await HandleExceptionAsync (context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync (HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger) {
            object errors = null;

            switch (ex) {
                case RestException re: // if this is an error that the user created 4xx
                    logger.LogError (ex, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int) re.Code;
                    break;
                case Exception e: // if there is an error within the server 5xx
                    logger.LogError (ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace (e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";
            if (errors != null) {
                var result = JsonSerializer.Serialize (new { errors });

                await context.Response.WriteAsync (result);
            }
        }
    }
}