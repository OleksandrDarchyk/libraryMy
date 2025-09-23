namespace api.DTOs;

public class BookResponseDto
{
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public int Pages { get; set; }

    public DateTime? Createdat { get; set; }
    

    public virtual GenreResponseDto? Genre { get; set; }

    public virtual ICollection<AuthorResponseDto> Authors { get; set; } = new List<AuthorResponseDto>();
}