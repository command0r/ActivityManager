using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    // api/activities
    // Cancellation token won't work, unless it's passed to a Handler (where cancellation logic is implemented)
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync(CancellationToken ct)
    {
        // Sending query to a Mediator handler
        // Send method is also able to pass a Cancellation token
        return await Mediator.Send(new List.Query(), ct);
    }

    // api/activities/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivityAsync(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    // Create endpoint
    [HttpPost]
    public async Task<IActionResult> CreateActivityAsync(Activity activity)
    {
        return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
    }

    // Editing (updating) activities
    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivityAsync(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
    }

    // Deleting an event
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivityAsync(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
}