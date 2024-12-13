using System.ComponentModel.DataAnnotations;

namespace PlantCareScheduler.API.Models
{
    public class Plant
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [RegularExpression("^(succulent|tropical|herb|cacti)$")]
        public string Type { get; set; } // Allowed: 'succulent', 'tropical', 'herb', 'cacti'

        [Range(1, 365)]
        public int WateringFrequencyDays { get; set; }

        [Required]
        public DateTime LastWateredDate { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; }
    }
}
