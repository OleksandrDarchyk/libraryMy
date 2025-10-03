using System.ComponentModel.DataAnnotations;

namespace api.Service.DTOs.RequestDto;


public record UpdateBookRequestDto
{
    [MinLength(1)]
    public string? NewTitle { get; set; }

    [Range(1, int.MaxValue)]
    public int? NewPageCount { get; set; }

    public string? GenreId { get; set; }
    
    public List<string>? AuthorsIds { get; set; }
}