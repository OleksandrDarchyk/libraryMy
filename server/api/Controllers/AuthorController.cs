using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Servises.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorController : ControllerBase
{
    private readonly IAuthorService _authorService;

    public AuthorController(IAuthorService authorService)
    {
        _authorService = authorService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuthorResponseDto>>> GetAuthors()
    {
        var list = await _authorService.GetAuthors();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuthorResponseDto>> GetAuthorById(string id)
    {
        try
        {
            var dto = await _authorService.GetAuthorById(id);
            return Ok(dto);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<ActionResult<AuthorResponseDto>> CreateAuthor([FromBody] AuthorResponseDto authorResponseDto)
    {
        try
        {
            var created = await _authorService.CreateAuthor(authorResponseDto);
            return CreatedAtAction(nameof(GetAuthorById), new { id = created.Id }, created);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AuthorResponseDto>> UpdateAuthor(string id, [FromBody] AuthorResponseDto authorResponseDto)
    {
        try
        {
            var updated = await _authorService.UpdateAuthor(id, authorResponseDto);
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
    public async Task<IActionResult> DeleteAuthor(string id)
    {
        try
        {
            await _authorService.DeleteAuthor(id);
            return NoContent(); // 204
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
