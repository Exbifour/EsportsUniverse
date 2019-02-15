using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int DisciplineId { get; set; }
        public DateTime StartDateTime { get; set; }
        public bool IsFinished { get; set; }

        public Discipline Discipline { get; set; }

        public virtual IEnumerable<GamePlayerEvent> Events { get; set; }
        public virtual IEnumerable<MatchedTeam> MatchedTeams { get; set; }
    }
}
