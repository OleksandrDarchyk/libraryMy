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

    public async Task<List<AuthorResponseDto>> GetAuthors() =>
        await _db.Authors.AsNoTracking()
            .Select(a => new AuthorResponseDto { Id = a.Id, Name = a.Name })
            .ToListAsync();

    public async Task<AuthorResponseDto> CreateAuthor(AuthorResponseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        var e = new Author { Id = Guid.NewGuid().ToString(), Name = dto.Name, Createdat = DateTime.UtcNow };
        _db.Authors.Add(e);
        await _db.SaveChangesAsync();
        return new AuthorResponseDto { Id = e.Id, Name = e.Name };
    }

    public async Task<AuthorResponseDto> GetAuthorById(string id)
    {
        var a = await _db.Authors.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (a is null) throw new KeyNotFoundException();
        return new AuthorResponseDto { Id = a.Id, Name = a.Name };
    }

    public async Task<AuthorResponseDto> UpdateAuthor(string id, AuthorResponseDto dto)
    {
        var e = await _db.Authors.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();

        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length < 3)
            throw new ValidationException("Name must be at least 3 characters.");

        e.Name = dto.Name;
        await _db.SaveChangesAsync();
        return new AuthorResponseDto { Id = e.Id, Name = e.Name };
    }

    public async Task DeleteAuthor(string id)
    {
        var e = await _db.Authors.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();
        _db.Authors.Remove(e);
        await _db.SaveChangesAsync();
    }
}
