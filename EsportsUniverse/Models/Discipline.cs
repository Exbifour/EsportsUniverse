using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class Discipline
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(8)]
        public string Abbreviation { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public int MaxPlayersInTeam { get; set; }

        public IEnumerable<Team> Teams { get; set; }
    }
}
