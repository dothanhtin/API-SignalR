namespace TestApiSignalR_2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class DM_TEST
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
