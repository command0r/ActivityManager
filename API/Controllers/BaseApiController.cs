using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    // Populating _mediator variable with Mediator service
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    // Handling API return logic
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
        {
            return Ok(result.Value);
        }

        if (result.IsSuccess && result.Value == null)
        {
            return NotFound();
        }

        return BadRequest(result.Error);
    }
}