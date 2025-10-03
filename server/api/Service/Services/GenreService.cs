using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Etc.DTOs;
using api.Servises.Interfaces;
using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

namespace api.Servises;

public class GenreService : IGenreService
{
    private readonly MyDbContext _db;
    public GenreService(MyDbContext db) => _db = db;
    
    public async Task<List<GenreDto>> GetGenres()
    {
        var genres = await _db.Genres
            .AsNoTracking()
            .OrderBy(g => g.Name)
            .ToListAsync();
        
        return genres.Select(g => new GenreDto(g)).ToList();
    }
    
    public async Task<GenreDto> GetGenreById(string id)
    {
        var g = await _db.Genres
            .AsNoTracking()
            .Include(x => x.Books)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (g is null) throw new KeyNotFoundException("Genre not found");
        return new GenreDto(g);
    }

    public async Task<GenreDto> CreateGenre(GenreDto dto)
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

        return new GenreDto(e);
    }

    public async Task<GenreDto> UpdateGenre(string id, GenreDto dto)
    {
        var e = await _db.Genres.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException("Genre not found");

        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        e.Name = dto.Name;
        await _db.SaveChangesAsync();

        return new GenreDto(e);
    }

    public async Task DeleteGenre(string id)
    {
        var e = await _db.Genres.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException("Genre not found");

        _db.Genres.Remove(e);
        await _db.SaveChangesAsync();
    }
}
