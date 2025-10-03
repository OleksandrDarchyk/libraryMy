using api.DTOs;

namespace api.Servises.Interfaces;

public interface IBookService
{
    Task<List<BookDto>> GetBooks();
    Task<BookDto> CreateBook(BookDto bookDto);
        
    Task<BookDto> GetBookById(string id);
    Task<BookDto> UpdateBook(string id, BookDto bookDto);
    Task DeleteBook(string id);
}