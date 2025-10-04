using System.ComponentModel.DataAnnotations;
using api;
using api.DTOs;
using api.Etc.DTOs;
using api.Servises.Interfaces;
using Xunit;

namespace tests;

public class BookServiceTests(IBookService bookService, IAuthorService authorService, IGenreService genreService, ISeeder seeder)
{
    [Fact]
    public async Task GetBooks_CanGetAll()
    {
        await seeder.Seed();
        var list = await bookService.GetBooks();
        Assert.Contains(list, x => x.Id == "b1" && x.Title == "Alice book");
    }

    [Fact]
    public async Task Create_Invalid_Pages_Throws()
    {
        await Assert.ThrowsAsync<ValidationException>(async () =>
            await bookService.CreateBook(new BookDto { Title = "X", Pages = 0 }));
    }

    [Fact]
    public async Task Create_With_Genre_And_Author()
    {
        var a = await authorService.CreateAuthor(new AuthorDto { Name = "Author1" });
        var g = await genreService.CreateGenre(new GenreDto { Name = "Comedy" });

        var created = await bookService.CreateBook(new BookDto
        {
            Title = "B1",
            Pages = 111,
            Genre = new GenreDto { Id = g.Id },
            AuthorsIds = new List<string> { a.Id }
        });

        var loaded = await bookService.GetBookById(created.Id);
        Assert.Equal("B1", loaded.Title);
        Assert.Equal(111, loaded.Pages);
        Assert.Equal(g.Id, loaded.Genre?.Id);
        Assert.Contains(a.Id, loaded.AuthorsIds);
    }

    [Fact]
    public async Task Update_Changes_Title_Pages_Genre_And_Authors()
    {
        var a0 = await authorService.CreateAuthor(new AuthorDto { Name = "Author0" });
        var g0 = await genreService.CreateGenre(new GenreDto { Name = "Genre0" });

        var b = await bookService.CreateBook(new BookDto
        {
            Title = "Old",
            Pages = 5,
            Genre = new GenreDto { Id = g0.Id },
            AuthorsIds = new List<string> { a0.Id }
        });

        var a1 = await authorService.CreateAuthor(new AuthorDto { Name = "Author1" });
        var g1 = await genreService.CreateGenre(new GenreDto { Name = "Genre1" });

        var updated = await bookService.UpdateBook(b.Id, new BookDto
        {
            Title = "New title",
            Pages = 222,
            Genre = new GenreDto { Id = g1.Id },
            AuthorsIds = new List<string> { a1.Id }
        });

        Assert.Equal("New title", updated.Title);
        Assert.Equal(222, updated.Pages);
        Assert.Equal(g1.Id, updated.Genre?.Id);
        Assert.Contains(a1.Id, updated.AuthorsIds);
    }

    [Fact]
    public async Task Delete_Removes_Book()
    {
        var b = await bookService.CreateBook(new BookDto { Title = "To remove", Pages = 10 });
        await bookService.DeleteBook(b.Id);
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await bookService.GetBookById(b.Id));
    }
}
