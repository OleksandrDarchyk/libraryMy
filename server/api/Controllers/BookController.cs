using api.DTOs;
using api.Servises.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService) 
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<ActionResult<List<BookResponseDto>>> GetBooks()
    {
        throw new NotImplementedException();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookResponseDto>> GetBookById(string id)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<ActionResult<BookResponseDto>> CreateBook(BookResponseDto dto)
    {
        throw new NotImplementedException();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BookResponseDto>> UpdateBook(string id, BookResponseDto dto)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(string id)
    {
        throw new NotImplementedException();
    }
}