using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Servises.Interfaces;   
using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.EntityFrameworkCore;

namespace api.Servises;

public class AuthorService : IAuthorService
{
    private readonly MyDbContext _db;
    public AuthorService(MyDbContext db) => _db = db;

    public async Task<List<AuthorDto>> GetAuthors()
    {
        var authors = await _db.Authors
            .AsNoTracking()
            .OrderBy(a => a.Name)
            .ToListAsync();

        return authors.Select(a => new AuthorDto(a)).ToList();
    }

    public async Task<AuthorDto> CreateAuthor(AuthorDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        var e = new Author
        {
            Id = Guid.NewGuid().ToString(),
            Name = dto.Name,
            Createdat = DateTime.UtcNow
        };

        _db.Authors.Add(e);
        await _db.SaveChangesAsync();

        return new AuthorDto(e);
    }

    public async Task<AuthorDto> GetAuthorById(string id)
    {
        var a = await _db.Authors
            .AsNoTracking()
            .Include(x => x.Books)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (a is null) throw new KeyNotFoundException("Author not found");

        return new AuthorDto(a);
    }

    public async Task<AuthorDto> UpdateAuthor(string id, AuthorDto dto)
    {
        var e = await _db.Authors.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException("Author not found");

        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        e.Name = dto.Name;
        await _db.SaveChangesAsync();
        
        return new AuthorDto(e);
    }

    public async Task DeleteAuthor(string id)
    {
        var e = await _db.Authors.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException("Author not found");

        _db.Authors.Remove(e);
        await _db.SaveChangesAsync();
    }
}
