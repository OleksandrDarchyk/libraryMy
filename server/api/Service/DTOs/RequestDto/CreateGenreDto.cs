using System.ComponentModel.DataAnnotations;

namespace api.Service.DTOs.RequestDto;

public record CreateGenreRequestDto
{
    [Required, MinLength(3)]
    public string Name { get; set; } = null!;
}