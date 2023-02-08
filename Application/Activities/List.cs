using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<List<Activity>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
        // Injecting a DB context via constructor
        private readonly DataContext _context;
        private readonly ILogger<List> _logger;

        public Handler(DataContext context, ILogger<List> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            /*try
            {
                for (int i = 0; i < 5; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(500, cancellationToken);
                    _logger.LogInformation($"Task {i} has completed");
                }
            }
            catch (System.Exception)
            {
                _logger.LogInformation("Task was cancelled");
            }*/

            return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
        }
    }
}