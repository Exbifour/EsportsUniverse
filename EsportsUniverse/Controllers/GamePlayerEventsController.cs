using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EsportsUniverse.Data;
using EsportsUniverse.Models;

namespace EsportsUniverse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamePlayerEventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GamePlayerEventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> ArduinoPulseLog(IEnumerable<GamePlayerEvent> pulseLog)
        {
            await _context.GamePlayerEvents.AddRangeAsync(pulseLog);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/GamePlayerEvents
        [HttpGet]
        public IEnumerable<GamePlayerEvent> GetGamePlayerEvents()
        {
            return _context.GamePlayerEvents;
        }

        // GET: api/GamePlayerEvents/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGamePlayerEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gamePlayerEvent = await _context.GamePlayerEvents.FindAsync(id);

            if (gamePlayerEvent == null)
            {
                return NotFound();
            }

            return Ok(gamePlayerEvent);
        }

        // PUT: api/GamePlayerEvents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGamePlayerEvent([FromRoute] int id, [FromBody] GamePlayerEvent gamePlayerEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gamePlayerEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(gamePlayerEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GamePlayerEventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GamePlayerEvents
        [HttpPost]
        public async Task<IActionResult> PostGamePlayerEvent([FromBody] GamePlayerEvent gamePlayerEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GamePlayerEvents.Add(gamePlayerEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGamePlayerEvent", new { id = gamePlayerEvent.Id }, gamePlayerEvent);
        }

        // DELETE: api/GamePlayerEvents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGamePlayerEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gamePlayerEvent = await _context.GamePlayerEvents.FindAsync(id);
            if (gamePlayerEvent == null)
            {
                return NotFound();
            }

            _context.GamePlayerEvents.Remove(gamePlayerEvent);
            await _context.SaveChangesAsync();

            return Ok(gamePlayerEvent);
        }

        private bool GamePlayerEventExists(int id)
        {
            return _context.GamePlayerEvents.Any(e => e.Id == id);
        }
    }
}