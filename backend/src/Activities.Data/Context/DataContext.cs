using System.Diagnostics;
using Activities.Data.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Activities.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ActivityMap());
        }
    }
}