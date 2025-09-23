using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using api;
using api.Etc;
using api.Servises;
using api.Servises.Interfaces;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();//dependency injection system
builder.Services.AddOpenApiDocument();
builder.Services.AddCors();
builder.Services.AddScoped<IAuthorService,AuthorService>();
builder.Services.AddScoped<IBookService,BookService>();
builder.Services.AddScoped<IGenreService,GenreService>();

builder.Services.AddSingleton<AppOptions>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var appOptions = new AppOptions();
    configuration.GetSection(nameof(AppOptions)).Bind(appOptions);
    Validator.ValidateObject(appOptions ,new ValidationContext(appOptions), true);//optional check DataAnnotations
    return appOptions;
});

builder.Services.AddDbContext<MyDbContext>((services ,options) =>
{
    options.UseNpgsql(services.GetRequiredService<AppOptions>().DbConnectionString);
});

var app = builder.Build();



app.MapControllers();//// middleware
app.UseOpenApi();
app.UseSwaggerUi();
app.GenerateApiClientsFromOpenApi("/../../client/src/generated-client.ts").GetAwaiter().GetResult();
app.UseCors(config => config.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(x => true));

var appOptions = app.Services.GetRequiredService<AppOptions>();
Console.WriteLine(JsonSerializer.Serialize(appOptions));

app.Run();
