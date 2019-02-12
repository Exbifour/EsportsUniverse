using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class TeamPlayer
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public int PlayerId { get; set; }
        [Column(TypeName = "date")]
        public DateTime DateJoined { get; set; }
        [Column(TypeName = "date")]
        public DateTime DateLeft { get; set; }

        public Team Team { get; set; }
        public Player Player { get; set; }
    }
}
