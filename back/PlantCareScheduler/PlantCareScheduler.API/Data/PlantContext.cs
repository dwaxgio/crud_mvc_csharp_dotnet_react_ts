using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.API.Models;

namespace PlantCareScheduler.API.Data
{
    public class PlantContext : DbContext
    {
        public PlantContext(DbContextOptions<PlantContext> options) : base(options) { }

        public DbSet<Plant> Plants { get; set; }
    }
}
