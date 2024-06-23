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

        public DbSet<Category> Category { get; set; }
        public DbSet<CategoryItem> CategoryItem { get; set; }
        public DbSet<MediaType> MediaType { get; set; }
        public DbSet<UserCategory> UserCategory { get; set; }
        public DbSet<Content> Content { get; set; }
    }
}
