using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    // Command (as per CQRS) does not return a result
    public class Command : IRequest
    {
        // Passing Activity object as a parameter here (for 'create' operation)
        public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        // Inject data context
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            // It does not interact with the DB here, so, no need to use Async version of method
            _context.Activities.Add(request.Activity);

            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}