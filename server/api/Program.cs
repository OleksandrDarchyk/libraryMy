using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using api;
using api.Etc;
using api.Servises;
using api.Servises.Interfaces;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

public class Program
{
    public static void Main()
    {
        var builder = WebApplication.CreateBuilder();

        ConfigureServices(builder.Services);

        var app = builder.Build();
        var appOptions = app.Services.GetRequiredService<AppOptions>();
        Console.WriteLine(JsonSerializer.Serialize(appOptions));

        //// middleware
        app.MapControllers();
        app.UseOpenApi();
        app.UseSwaggerUi();
        app.GenerateApiClientsFromOpenApi("/../../client/src/api/generated-client.ts").GetAwaiter().GetResult();
        app.UseCors(config => config.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(x => true));

     

        app.Run();


    }

    public static void ConfigureServices(IServiceCollection services)
    {


        services.AddSingleton<AppOptions>(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            var appOptions = new AppOptions();
            configuration.GetSection(nameof(AppOptions)).Bind(appOptions);
            
            return appOptions;
        });

        services.AddDbContext<MyDbContext>((services, options) =>
        {
            options.UseNpgsql(services.GetRequiredService<AppOptions>().DbConnectionString);
        });

        services.AddControllers(); //dependency injection system
        services.AddOpenApiDocument();
        services.AddCors();
        services.AddScoped<IAuthorService, AuthorService>();
        services.AddScoped<IBookService, BookService>();
        services.AddScoped<IGenreService, GenreService>();
    }
}







