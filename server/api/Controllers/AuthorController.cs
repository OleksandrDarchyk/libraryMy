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
    public async Task<ActionResult<List<AuthorDto>>> GetAuthors()
    {
        var list = await _authorService.GetAuthors();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuthorDto>> GetAuthorById(string id)
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
    public async Task<ActionResult<AuthorDto>> CreateAuthor([FromBody] AuthorDto authorDto)
    {
        try
        {
            var created = await _authorService.CreateAuthor(authorDto);
            return Ok(created);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AuthorDto>> UpdateAuthor(string id, [FromBody] AuthorDto authorDto)
    {
        try
        {
            var updated = await _authorService.UpdateAuthor(id, authorDto);
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
    }//
}
