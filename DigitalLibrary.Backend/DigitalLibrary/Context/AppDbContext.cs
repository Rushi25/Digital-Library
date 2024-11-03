using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DigitalLibrary.Context
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryItem> CategoryItems { get; set; }
        public DbSet<MediaType> MediaTypes { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
