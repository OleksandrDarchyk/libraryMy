using api.DTOs;
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
    public async Task<ActionResult<List<GenreResponseDto>>> GetGenres()
    {
        throw new NotImplementedException();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GenreResponseDto>> GetGenreById(string id)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<ActionResult<GenreResponseDto>> CreateGenre(GenreResponseDto dto)
    {
        throw new NotImplementedException();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GenreResponseDto>> UpdateGenre(string id, GenreResponseDto dto)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteGenre(string id)
    {
        throw new NotImplementedException();
    }
}