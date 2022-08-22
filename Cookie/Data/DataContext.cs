using Cookie.Model;
using Microsoft.EntityFrameworkCore;

namespace Cookie.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Cookie> FoodList { get; set; }
        public DbSet<Login> Logindb { get; set; }
    }
}
