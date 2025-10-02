using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Servises.Interfaces;
using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding; 
using Microsoft.EntityFrameworkCore;

namespace api.Servises;

public class GenreService : IGenreService
{
    private readonly MyDbContext _db;
    public GenreService(MyDbContext db) => _db = db;

    public async Task<List<GenreResponseDto>> GetGenres() =>
        await _db.Genres.AsNoTracking()
            .Select(g => new GenreResponseDto { Id = g.Id, Name = g.Name })
            .ToListAsync();

    public async Task<GenreResponseDto> GetGenreById(string id)
    {
        var g = await _db.Genres.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (g is null) throw new KeyNotFoundException();
        return new GenreResponseDto { Id = g.Id, Name = g.Name };
    }

    public async Task<GenreResponseDto> CreateGenre(GenreResponseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        var e = new Genre
        {
            Id = Guid.NewGuid().ToString(),
            Name = dto.Name,
            Createdat = DateTime.UtcNow
        };

        _db.Genres.Add(e);
        await _db.SaveChangesAsync();

        return new GenreResponseDto { Id = e.Id, Name = e.Name };
    }

    public async Task<GenreResponseDto> UpdateGenre(string id, GenreResponseDto dto)
    {
        var e = await _db.Genres.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();

        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        e.Name = dto.Name;
        await _db.SaveChangesAsync();

        return new GenreResponseDto { Id = e.Id, Name = e.Name };
    }

    public async Task DeleteGenre(string id)
    {
        var e = await _db.Genres.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();

        _db.Genres.Remove(e);
        await _db.SaveChangesAsync();
    }
}
