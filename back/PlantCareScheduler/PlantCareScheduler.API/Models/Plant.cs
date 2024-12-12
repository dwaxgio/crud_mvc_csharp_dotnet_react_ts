namespace PlantCareScheduler.API.Models
{
    public class Plant
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } // 'succulent', 'tropical', 'herb', 'cacti'
        public int WateringFrequencyDays { get; set; }
        public DateTime LastWateredDate { get; set; }
        public string Location { get; set; }
    }
}
