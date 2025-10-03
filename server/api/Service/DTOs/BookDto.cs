using api.Etc.DTOs;        
using efscaffold.Entities;

namespace api.DTOs;

public class BookDto
{
    public BookDto()
    {
    }
    public BookDto(Book entity)
    {
        Id = entity.Id;
        Title = entity.Title;
        Pages = entity.Pages;
        Createdat = entity.Createdat; 

        Genre = entity.Genre is null ? null : new GenreDto(entity.Genre); 

        AuthorsIds = entity.Authors?.Select(a => a.Id).ToList() ?? new List<string>();
    }

    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public int Pages { get; set; }
    public DateTime? Createdat { get; set; }
    public GenreDto? Genre { get; set; }                       
    public ICollection<string> AuthorsIds { get; set; } = new List<string>(); 
}