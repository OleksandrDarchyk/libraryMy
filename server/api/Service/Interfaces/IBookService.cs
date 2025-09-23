using api.DTOs;

namespace api.Servises.Interfaces;

public interface IBookService
{
    Task<List<BookResponseDto>> GetBooks();
    Task<BookResponseDto> CreateBook(BookResponseDto bookResponseDto);
        
    Task<BookResponseDto> GetBookById(string id);
    Task<BookResponseDto> UpdateBook(string id, BookResponseDto bookResponseDto);
    Task DeleteBook(string id);
}