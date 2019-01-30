namespace TestClientCallAPI_SignalR.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestDemo : DbContext
    {
        public TestDemo()
            : base("name=TestDemo")
        {
        }

        public virtual DbSet<DM_TEST> DM_TEST { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
