using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Testcontainers.PostgreSql;

namespace Tests;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        // 1. Load the same DI configuration as in Program.cs
        Program.ConfigureServices(services);

        // 2. Remove the default DbContext registration (points to the real DB)
        services.RemoveAll(typeof(MyDbContext));

        // 3. Register a new DbContext that uses a PostgreSQL Testcontainer
        services.AddScoped<MyDbContext>(factory =>
        {
            // Create a new PostgreSQL container instance
            var postgreSqlContainer = new PostgreSqlBuilder().Build();

            // Start the container (synchronously wait for it to be ready)
            postgreSqlContainer.StartAsync().GetAwaiter().GetResult();

            // Get the connection string from the container
            var connectionString = postgreSqlContainer.GetConnectionString();

            // Build DbContextOptions using the container connection string
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseNpgsql(connectionString)
                .Options;

            // Create a new DbContext with those options
            var ctx = new MyDbContext(options);

            // Ensure the database schema is created before running tests
            ctx.Database.EnsureCreated();

            // Return the DbContext instance for dependency injection
            return ctx;
        });
    }
}