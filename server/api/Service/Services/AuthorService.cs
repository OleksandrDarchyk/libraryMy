using api.DTOs;
using api.Servises.Interfaces;

namespace api.Servises;

public class AuthorService:IAuthorService
{
    public Task<List<AuthorResponseDto>> GetAuthors()
    {
        throw new NotImplementedException();
    }

    public Task<AuthorResponseDto> CreateAuthor(AuthorResponseDto authorResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task<AuthorResponseDto> GetAuthorById(string id)
    {
        throw new NotImplementedException();
    }

    public Task<AuthorResponseDto> UpdateAuthor(string id, AuthorResponseDto authorResponseDto)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAuthor(string id)
    {
        throw new NotImplementedException();
    }
}