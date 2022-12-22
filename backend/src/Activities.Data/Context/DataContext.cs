using System.Diagnostics.CodeAnalysis;
using Activities.Data.Mappings;
using Activities.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Activities.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {
        }

        public DbSet<Activity> Activities { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ActivityMap());
        }
    }
}