using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class EventTypes
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public bool IsConvertableToNumber { get; set; }

        public virtual IEnumerable<GamePlayerEvent> Events { get; set; }
    }
}
