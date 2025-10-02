using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Servises.Interfaces;
using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding; 
using Microsoft.EntityFrameworkCore;

namespace api.Servises;

public class BookService : IBookService
{
    private readonly MyDbContext _db;
    public BookService(MyDbContext db) => _db = db;

    public async Task<List<BookResponseDto>> GetBooks() =>
        await _db.Books.AsNoTracking()
            .Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                Pages = b.Pages
            })
            .ToListAsync();

    public async Task<BookResponseDto> GetBookById(string id)
    {
        var b = await _db.Books.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (b is null) throw new KeyNotFoundException();
        return new BookResponseDto
        {
            Id = b.Id,
            Title = b.Title,
            Pages = b.Pages
        };
    }

    public async Task<BookResponseDto> CreateBook(BookResponseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new ValidationException("Title is required.");
        if (dto.Pages <= 0)
            throw new ValidationException("Pages must be greater than 0.");

        var e = new Book
        {
            Id = Guid.NewGuid().ToString(),
            Title = dto.Title,
            Pages = dto.Pages,
            Createdat = DateTime.UtcNow
            // If needed: Genreid = dto.GenreId
        };

        _db.Books.Add(e);
        await _db.SaveChangesAsync();

        return new BookResponseDto
        {
            Id = e.Id,
            Title = e.Title,
            Pages = e.Pages
        };
    }

    public async Task<BookResponseDto> UpdateBook(string id, BookResponseDto dto)
    {
        var e = await _db.Books.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();

        if (!string.IsNullOrWhiteSpace(dto.Title)) e.Title = dto.Title;
        if (dto.Pages > 0) e.Pages = dto.Pages;
       

        await _db.SaveChangesAsync();

        return new BookResponseDto
        {
            Id = e.Id,
            Title = e.Title,
            Pages = e.Pages
            
        };
    }

    public async Task DeleteBook(string id)
    {
        var e = await _db.Books.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException();

        _db.Books.Remove(e);
        await _db.SaveChangesAsync();
    }
}
