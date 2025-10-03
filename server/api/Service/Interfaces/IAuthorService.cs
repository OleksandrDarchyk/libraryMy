using api.DTOs;

namespace api.Servises.Interfaces;

public interface IAuthorService
{
    Task<List<AuthorDto>> GetAuthors();
    Task<AuthorDto> CreateAuthor(AuthorDto authorDto);
        
    Task<AuthorDto> GetAuthorById(string id);
    Task<AuthorDto> UpdateAuthor(string id, AuthorDto authorDto);
    Task DeleteAuthor(string id);
}