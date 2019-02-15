using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EsportsUniverse.Models
{
    public class Player
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nickname { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }

        public virtual IEnumerable<GamePlayerEvent> Events { get; set; }
    }
}
