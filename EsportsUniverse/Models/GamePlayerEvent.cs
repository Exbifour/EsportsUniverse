using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class GamePlayerEvent
    {
        public int Id { get; set; }
        public int? GameId { get; set; }
        public int PlayerId { get; set; }
        public int TypeId { get; set; }
        public string Value { get; set; }
        public DateTime DateTime { get; set; }

        public Game Game { get; set; }
        public Player Player { get; set; }
        public EventType Type { get; set; }
    }
}
