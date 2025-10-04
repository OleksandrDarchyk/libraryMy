using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Etc.DTOs;
using api.Servises.Interfaces;
using api.Service.DTOs.RequestDto;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;
    public BookController(IBookService bookService) => _bookService = bookService;

    [HttpGet]
    public async Task<ActionResult<List<BookDto>>> GetBooks()
    {
        var list = await _bookService.GetBooks();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBookById(string id)
    {
        try
        {
            var dto = await _bookService.GetBookById(id);
            return Ok(dto);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook([FromBody] CreateBookRequestDto req)
    {
        try
        {
            var dto = new BookDto
            {
                Title = req.Title,
                Pages = req.Pages,
                Genre = string.IsNullOrWhiteSpace(req.GenreId) ? null : new GenreDto { Id = req.GenreId },
                AuthorsIds = req.AuthorsIds ?? new List<string>()
            };

            var created = await _bookService.CreateBook(dto);
            return Ok(created);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BookDto>> UpdateBook(string id, [FromBody] UpdateBookRequestDto req)
    {
        try
        {
            var dto = new BookDto();

            if (!string.IsNullOrWhiteSpace(req.NewTitle))
                dto.Title = req.NewTitle;

            if (req.NewPageCount.HasValue)
                dto.Pages = req.NewPageCount.Value;

            if (!string.IsNullOrWhiteSpace(req.GenreId))
                dto.Genre = new GenreDto { Id = req.GenreId };

            if (req.AuthorsIds is not null)
                dto.AuthorsIds = req.AuthorsIds;

            var updated = await _bookService.UpdateBook(id, dto);
            return Ok(updated);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(string id)
    {
        try
        {
            await _bookService.DeleteBook(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}