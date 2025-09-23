using api.DTOs;

namespace api.Servises.Interfaces;

public interface IAuthorService
{
    Task<List<AuthorResponseDto>> GetAuthors();
    Task<AuthorResponseDto> CreateAuthor(AuthorResponseDto authorResponseDto);
        
    Task<AuthorResponseDto> GetAuthorById(string id);
    Task<AuthorResponseDto> UpdateAuthor(string id, AuthorResponseDto authorResponseDto);
    Task DeleteAuthor(string id);
}