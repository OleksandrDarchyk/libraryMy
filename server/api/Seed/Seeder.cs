using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

namespace api;

public class Seeder(MyDbContext ctx) : ISeeder
{
    public async Task Seed()
    {
        await ctx.Database.EnsureCreatedAsync();

        ctx.Books.RemoveRange(ctx.Books);
        ctx.Authors.RemoveRange(ctx.Authors);
        ctx.Genres.RemoveRange(ctx.Genres);
        await ctx.SaveChangesAsync();

        var now = DateTime.UtcNow;

        var genre = new Genre
        {
            Id = "g1",
            Name = "comedy",
            Createdat = now
        };

        var author = new Author
        {
            Id = "a1",
            Name = "Alice",
            Createdat = now
        };

        var book = new Book
        {
            Id = "b1",
            Title = "Alice book",
            Pages = 123,
            Createdat = now,
            Genre = genre
        };
        book.Authors.Add(author);

        ctx.Genres.Add(genre);
        ctx.Authors.Add(author);
        ctx.Books.Add(book);

        await ctx.SaveChangesAsync();
    }
}

public interface ISeeder
{
    Task Seed();
}