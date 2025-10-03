using System.ComponentModel.DataAnnotations;

namespace api.Service.DTOs.RequestDto;

public record UpdateGenreRequestDto
{
    [Required, MinLength(3)]
    public string NewName { get; set; } = null!;
}