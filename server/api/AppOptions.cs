using System.ComponentModel.DataAnnotations;

namespace api;

public sealed class AppOptions
{
        
        [Required] 
        [MinLength(20)]
        public string DbConnectionString { get; set; } = string.Empty!;
    
}