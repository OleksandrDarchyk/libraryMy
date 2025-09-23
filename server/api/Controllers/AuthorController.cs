using api.DTOs;
using api.Servises.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AuthorController: ControllerBase
{
    private readonly IAuthorService _authorService;

    public AuthorController(IAuthorService authorService)// injects IAuthorService via Dependency Injection (constructor injection)
    {
        _authorService = authorService;   
    }
    [HttpGet]
    public async Task<ActionResult<List<AuthorResponseDto>>> GetAuthors()
    {
        throw new NotImplementedException();
    }

    [HttpGet("{id}")]   
    public async Task<ActionResult<AuthorResponseDto>> GetAuthorById(string id)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost]  
    public async Task<ActionResult<AuthorResponseDto>> CreateAuthor(AuthorResponseDto authorResponseDto)
    {
        throw new NotImplementedException();
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<AuthorResponseDto>> UpdateAuthor(string id, AuthorResponseDto authorResponseDto)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuthor(string id)
    {
        throw new NotImplementedException();
    }
}