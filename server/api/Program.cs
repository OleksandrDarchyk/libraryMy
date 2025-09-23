using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using api;
using api.Etc;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();
builder.Services.AddCors();


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


app.MapGet("/", () => "Hello World!");
app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();
app.GenerateApiClientsFromOpenApi("/../../client/src/generated-client.ts").GetAwaiter().GetResult();
app.UseCors(config => config.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(x => true));

var appOptions = app.Services.GetRequiredService<AppOptions>();
Console.WriteLine(JsonSerializer.Serialize(appOptions));

app.Run();
