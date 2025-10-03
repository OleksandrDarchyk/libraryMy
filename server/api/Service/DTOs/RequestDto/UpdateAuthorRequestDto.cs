using System.ComponentModel.DataAnnotations;

namespace api.Service.DTOs.RequestDto;


public record UpdateAuthorRequestDto
{
    [Required, MinLength(3)]
    public string NewName { get; set; } = null!;
    
    public List<string>? BooksIds { get; set; }
}