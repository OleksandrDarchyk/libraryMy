using System.ComponentModel.DataAnnotations;

namespace api.Service.DTOs.RequestDto;

public record CreateBookRequestDto
{
    [Required, MinLength(1)]
    public string Title { get; set; } = null!;
    
    [Required, Range(1, int.MaxValue)]
    public int Pages { get; set; }
    
    public string? GenreId { get; set; }
    
    public List<string>? AuthorsIds { get; set; }
}