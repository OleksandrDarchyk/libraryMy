
namespace api.DTOs;

public class AuthorResponseDto
{
    
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime? Createdat { get; set; }

    public virtual ICollection<BookResponseDto> Books { get; set; } = new List<BookResponseDto>();
}