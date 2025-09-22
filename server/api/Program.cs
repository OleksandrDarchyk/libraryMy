using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using api;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



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


var appOptions = app.Services.GetRequiredService<AppOptions>();
Console.WriteLine(JsonSerializer.Serialize(appOptions));

app.Run();
