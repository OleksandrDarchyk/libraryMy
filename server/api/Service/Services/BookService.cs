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
    
    public async Task<List<BookDto>> GetBooks()
    {
        var books = await _db.Books
            .AsNoTracking()
            .OrderBy(b => b.Title)
            .ToListAsync();

        return books.Select(b => new BookDto(b)).ToList();
    }
    
    public async Task<BookDto> GetBookById(string id)
    {
        var b = await _db.Books
            .AsNoTracking()
            .Include(x => x.Genre)
            .Include(x => x.Authors)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (b is null) throw new KeyNotFoundException("Book not found");
        return new BookDto(b);
    }

    public async Task<BookDto> CreateBook(BookDto dto)
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
        };
        
        if (dto.Genre?.Id is string genreId)
        {
            var genre = await _db.Genres.FirstOrDefaultAsync(g => g.Id == genreId);
            if (genre is null) throw new ValidationException("Genre does not exist.");
            e.Genre = genre; 
        }
        
        if (dto.AuthorsIds is { Count: > 0 })
        {
            var authors = await _db.Authors
                .Where(a => dto.AuthorsIds.Contains(a.Id))
                .ToListAsync();

            if (authors.Count != dto.AuthorsIds.Count)
                throw new ValidationException("One or more authors do not exist.");

            e.Authors = authors;
        }

        _db.Books.Add(e);
        await _db.SaveChangesAsync();
        
        await _db.Entry(e).Reference(x => x.Genre).LoadAsync();
        await _db.Entry(e).Collection(x => x.Authors).LoadAsync();
        return new BookDto(e);
    }

    public async Task<BookDto> UpdateBook(string id, BookDto dto)
    {
        var e = await _db.Books
            .Include(x => x.Authors) 
            .Include(x => x.Genre)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (e is null) throw new KeyNotFoundException("Book not found");

        if (!string.IsNullOrWhiteSpace(dto.Title)) e.Title = dto.Title;
        if (dto.Pages > 0) e.Pages = dto.Pages;
        
        if (dto.Genre is not null)
        {
            if (string.IsNullOrWhiteSpace(dto.Genre.Id))
                throw new ValidationException("Genre.Id is required when setting Genre.");

            var genre = await _db.Genres.FirstOrDefaultAsync(g => g.Id == dto.Genre.Id);
            if (genre is null) throw new ValidationException("Genre does not exist.");
            e.Genre = genre;
        }
        
        if (dto.AuthorsIds is not null)
        {
            var newAuthors = await _db.Authors
                .Where(a => dto.AuthorsIds.Contains(a.Id))
                .ToListAsync();

            if (newAuthors.Count != dto.AuthorsIds.Count)
                throw new ValidationException("One or more authors do not exist.");

            e.Authors.Clear();
            foreach (var a in newAuthors)
                e.Authors.Add(a);
        }

        await _db.SaveChangesAsync();
        
        await _db.Entry(e).Reference(x => x.Genre).LoadAsync();
        await _db.Entry(e).Collection(x => x.Authors).LoadAsync();
        return new BookDto(e);
    }

    public async Task DeleteBook(string id)
    {
        var e = await _db.Books.FirstOrDefaultAsync(x => x.Id == id);
        if (e is null) throw new KeyNotFoundException("Book not found");

        _db.Books.Remove(e);
        await _db.SaveChangesAsync();
    }
}
