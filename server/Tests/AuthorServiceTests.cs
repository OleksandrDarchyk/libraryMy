using System.ComponentModel.DataAnnotations;
using api;
using api.DTOs;
using api.Servises.Interfaces;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace tests;

public class AuthorServiceTests(IAuthorService authorService, MyDbContext ctx, ISeeder seeder)
{
    [Fact]
    public async Task CreateAuthor_Success()
    {
        var created = await authorService.CreateAuthor(new AuthorDto { Name = "Alice" });
        Assert.False(string.IsNullOrWhiteSpace(created.Id));
        Assert.Equal("Alice", created.Name);

        var loaded = await authorService.GetAuthorById(created.Id);
        Assert.Equal(created.Id, loaded.Id);
    }

    [Fact]
    public async Task CreateAuthor_InvalidName_Throws()
    {
        await Assert.ThrowsAsync<ValidationException>(async () =>
            await authorService.CreateAuthor(new AuthorDto { Name = "ab" }));
    }

    [Fact]
    public async Task UpdateAuthor_ChangesName_And_Reflects_In_Relations()
    {
        await seeder.Seed();

        var updated = await authorService.UpdateAuthor("a1", new AuthorDto { Name = "New Name" });
        Assert.Equal("New Name", updated.Name);

        var nameInBook = await ctx.Books
            .Include(b => b.Authors)
            .Where(b => b.Id == "b1")
            .SelectMany(b => b.Authors)
            .Where(a => a.Id == "a1")
            .Select(a => a.Name)
            .SingleAsync();

        Assert.Equal("New Name", nameInBook);
    }
}