using Activities.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Activities.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {
        }
        
        public DbSet<Activity> Activities { get; set; }
    }
}