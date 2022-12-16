using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// A session with the database
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options)
        : base(options)
    {
    }

    // DbSets - these represent the actual tables
    // In here, we specify the name of the entity we want to work with (created in the Domain layer)
    public DbSet<Activity> Activities { get; set; }
}
