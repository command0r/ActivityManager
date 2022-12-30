using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IMediator _mediator;

    public ActivitiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync()
    {
        // Sending query to a Mediator handler
        return await _mediator.Send(new List.Query());
    }

    // api/activities/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityAsync(Guid id)
    {
        return Ok();
    }
}