using api.DTOs;

namespace api.Servises.Interfaces;

public interface IGenreService
{
    Task<List<GenreResponseDto>> GetGenres();
    Task<GenreResponseDto> CreateGenre(GenreResponseDto genreResponseDto);
        
    Task<GenreResponseDto> GetGenreById(string id);
    Task<GenreResponseDto> UpdateGenre(string id, GenreResponseDto genreResponseDto);
    Task DeleteGenre(string id);
}