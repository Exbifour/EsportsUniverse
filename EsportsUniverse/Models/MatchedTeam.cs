using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class MatchedTeam
    {
        public int TeamId { get; set; }
        public int GameId { get; set; }

        public Team Team { get; set; }
        public Game Game { get; set; }
    }
}
