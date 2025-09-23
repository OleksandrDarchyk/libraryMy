using api.DTOs;
using api.Servises.Interfaces;

namespace api.Servises;

public class GenreService:IGenreService
{
    public Task<List<GenreResponseDto>> GetGenres()
    {
        throw new NotImplementedException();
    }

    public Task<GenreResponseDto> CreateGenre(GenreResponseDto genreResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task<GenreResponseDto> GetGenreById(string id)
    {
        throw new NotImplementedException();
    }

    public Task<GenreResponseDto> UpdateGenre(string id, GenreResponseDto genreResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task DeleteGenre(string id)
    {
        throw new NotImplementedException();
    }
}