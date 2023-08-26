using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{

    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; } // Id of the photo
        public string Url { get; set; } // Url of the photo
        public bool IsMain { get; set; } // Is this the main photo?
        public string PublicId { get; set; } // Public Id of the photo
        public int AppUserId { get; set; } // Id of the user who owns this photo
        public AppUser AppUser { get; set; } // User who owns this photo
    }
}