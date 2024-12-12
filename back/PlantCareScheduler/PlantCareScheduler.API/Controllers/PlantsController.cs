using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.API.Data;
using PlantCareScheduler.API.Models;

namespace PlantCareScheduler.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly PlantContext _context;

        public PlantsController(PlantContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlants()
        {
            var plants = await _context.Plants.ToListAsync();
            return Ok(plants);
        }

        [HttpPost]
        public async Task<IActionResult> AddPlant([FromBody] Plant plant)
        {
            plant.Id = Guid.NewGuid();
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlants), new { id = plant.Id }, plant);
        }

        [HttpPut("{id}/water")]
        public async Task<IActionResult> WaterPlant(Guid id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();

            plant.LastWateredDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("due")]
        public async Task<IActionResult> GetDuePlants()
        {
            var today = DateTime.Today;
            var duePlants = await _context.Plants
                .Where(p => EF.Functions.DateDiffDay(p.LastWateredDate, today) >= p.WateringFrequencyDays)
                .ToListAsync();

            return Ok(duePlants);
        }
    }
}
