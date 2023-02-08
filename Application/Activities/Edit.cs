using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
    }

    // Validation logic
    public class CommandValidator : AbstractValidator<Create.Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);

            if (activity == null)
            {
                return null;
            }

            // activity.Title = request.Activity.Title ?? activity.Title;
            // Replaced with Automapper code below (the properties from 'request' will replace those in a DB):
            _mapper.Map(request.Activity, activity);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                return Result<Unit>.Failure("Failed to update activity");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}