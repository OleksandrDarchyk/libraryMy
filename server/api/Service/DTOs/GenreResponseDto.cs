namespace api.DTOs;

public class GenreResponseDto
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime? Createdat { get; set; }

    public virtual List <string> Books { get; set; } = new List<string>();
}