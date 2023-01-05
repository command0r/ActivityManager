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
}