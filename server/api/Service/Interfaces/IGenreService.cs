using api.DTOs;
using api.Etc.DTOs;

namespace api.Servises.Interfaces;

public interface IGenreService
{
    Task<List<GenreDto>> GetGenres();
    Task<GenreDto> CreateGenre(GenreDto genreDto);
        
    Task<GenreDto> GetGenreById(string id);
    Task<GenreDto> UpdateGenre(string id, GenreDto genreDto);
    Task DeleteGenre(string id);
}