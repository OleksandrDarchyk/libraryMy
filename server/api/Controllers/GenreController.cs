using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Etc.DTOs;
using api.Servises.Interfaces; 
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenreController : ControllerBase
{
    private readonly IGenreService _genreService;

    public GenreController(IGenreService genreService)
    {
        _genreService = genreService;
    }

    [HttpGet]
    public async Task<ActionResult<List<GenreDto>>> GetGenres()
    {
        var list = await _genreService.GetGenres();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GenreDto>> GetGenreById(string id)
    {
        try
        {
            var dto = await _genreService.GetGenreById(id);
            return Ok(dto);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<ActionResult<GenreDto>> CreateGenre([FromBody] GenreDto dto)
    {
        try
        {
            var created = await _genreService.CreateGenre(dto);
            return Ok(created);        }
        catch (ValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GenreDto>> UpdateGenre(string id, [FromBody] GenreDto dto)
    {
        try
        {
            var updated = await _genreService.UpdateGenre(id, dto);
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
    public async Task<IActionResult> DeleteGenre(string id)
    {
        try
        {
            await _genreService.DeleteGenre(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
