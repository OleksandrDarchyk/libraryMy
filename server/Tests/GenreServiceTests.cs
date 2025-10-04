using System.ComponentModel.DataAnnotations;
using api.Etc.DTOs;
using api.Servises.Interfaces;
using Xunit;

namespace tests;

public class GenreServiceTests(IGenreService genreService)
{
    [Fact]
    public async Task Create_And_Get_By_Id()
    {
        var g = await genreService.CreateGenre(new GenreDto { Name = "fantasy" });
        var loaded = await genreService.GetGenreById(g.Id);
        Assert.Equal(g.Id, loaded.Id);
        Assert.Equal("fantasy", loaded.Name);
    }

    [Fact]
    public async Task Create_Invalid_Name_Throws()
    {
        await Assert.ThrowsAsync<ValidationException>(async () =>
            await genreService.CreateGenre(new GenreDto { Name = "ab" }));
    }

    [Fact]
    public async Task Update_Changes_Name()
    {
        var g = await genreService.CreateGenre(new GenreDto { Name = "old" });
        var upd = await genreService.UpdateGenre(g.Id, new GenreDto { Name = "new" });
        Assert.Equal("new", upd.Name);
    }

    [Fact]
    public async Task Delete_Removes_Genre()
    {
        var g = await genreService.CreateGenre(new GenreDto { Name = "temp" });
        await genreService.DeleteGenre(g.Id);
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await genreService.GetGenreById(g.Id));
    }
}