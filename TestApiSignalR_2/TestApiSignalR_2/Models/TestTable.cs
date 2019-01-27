namespace TestApiSignalR_2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestTable : DbContext
    {
        public TestTable()
            : base("name=TestTable")
        {
        }

        public virtual DbSet<DM_TEST> DM_TEST { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
