using api.DTOs;
using api.Servises.Interfaces;

namespace api.Servises;

public class BookService:IBookService
{
    public Task<List<BookResponseDto>> GetBooks()
    {
        throw new NotImplementedException();
    }

    public Task<BookResponseDto> CreateBook(BookResponseDto bookResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task<BookResponseDto> GetBookById(string id)
    {
        throw new NotImplementedException();
    }

    public Task<BookResponseDto> UpdateBook(string id, BookResponseDto bookResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task DeleteBook(string id)
    {
        throw new NotImplementedException();
    }
}