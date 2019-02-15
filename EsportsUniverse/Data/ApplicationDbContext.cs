using EsportsUniverse.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Discipline> Disciplines { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<MatchedTeam> MatchedTeams { get; set; }
        public DbSet<GamePlayerEvent> GamePlayerEvents { get; set; }
        public DbSet<EventTypes> EventTypes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MatchedTeam>()
                .HasKey(mt => new { mt.GameId, mt.TeamId });
        }

    }
}
