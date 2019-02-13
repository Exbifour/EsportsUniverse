using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbrebiation { get; set; }
        public DateTime DateAdded { get; set; }

        public int DisciplineId { get; set; }

        public virtual Discipline Discipline { get; set; }

        public virtual IEnumerable<Player> Players { get; set; }
    }
}
