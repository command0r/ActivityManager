using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    // Command (as per CQRS) does not return a result (Unit comes from MediatR)
    public class Command : IRequest<Result<Unit>>
    {
        // Passing Activity object as a parameter here (for 'create' operation)
        public Activity Activity { get; set; }
    }

    // Validation logic
    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        // Inject data context
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // It does not interact with the DB here, so, no need to use Async version of method
            _context.Activities.Add(request.Activity);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                return Result<Unit>.Failure("Failed to create activity");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}