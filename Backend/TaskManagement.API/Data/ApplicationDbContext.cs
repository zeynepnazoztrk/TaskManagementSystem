namespace TaskManagement.API.Data;

using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Models;
using TaskManagement.API.Models.Enums;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users {get; set;}
    public DbSet<Category> Categories {get; set;}
    public DbSet<TaskItem> Tasks {get; set;}
    public DbSet<TaskAttachment> TaskAttachments {get; set;}
    public DbSet<TaskComment> TaskComments {get; set;}

    // Entity Konfigürasyonları (FluentAPI)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Entity Konf.
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Username).HasMaxLength(50).IsRequired();
            entity.HasIndex(u => u.Username).IsUnique();
            
            entity.Property(u => u.Email).HasMaxLength(100).IsRequired();
            entity.HasIndex(u => u.Email).IsUnique();

            entity.Property(u => u.PasswordHash).HasMaxLength(255).IsRequired();
            entity.Property(u => u.FirstName).HasMaxLength(50).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(50).IsRequired();
            entity.Property(u => u.IsActive).HasDefaultValue(true);
        });

        // Category Entity Konf.
        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(c => c.Name).HasMaxLength(100).IsRequired();
            entity.Property(c => c.Color).HasMaxLength(7).HasDefaultValue("#007bff");
            
            entity.HasOne(c => c.User).WithMany(u => u.Categories).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        // TaskItem Entity Konf.
        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.Property(t => t.Title).HasMaxLength(200).IsRequired();
            entity.Property(t => t.Priority).HasDefaultValue(Priority.Low).HasSentinel(Priority.Low);
            entity.Property(t => t.Status).HasDefaultValue(TaskStatus.Pending);
            entity.Property(t => t.UserId).IsRequired();

            entity.HasOne(t => t.User).WithMany(u => u.Tasks).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(t => t.Category).WithMany(c => c.Tasks).HasForeignKey(t => t.CategoryId).OnDelete(DeleteBehavior.SetNull);

        });

        // TaskAttachment Entity Konf.
        modelBuilder.Entity<TaskAttachment>(entity =>
        {
            entity.Property(ta => ta.TaskId).IsRequired();
            entity.Property(ta => ta.FileName).HasMaxLength(255).IsRequired();
            entity.Property(ta => ta.FilePath).HasMaxLength(500).IsRequired();
            entity.Property(ta => ta.ContentType).HasMaxLength(100).IsRequired();

            entity.HasOne(ta => ta.Task).WithMany(t => t.Attachments).HasForeignKey(ta => ta.TaskId).OnDelete(DeleteBehavior.Cascade);
        });

        // TaskComments Entity Konf.
        modelBuilder.Entity<TaskComment>(entity =>
        {
            entity.Property(tc => tc.TaskId).IsRequired();
            entity.Property(tc => tc.UserId).IsRequired();
            entity.Property(tc => tc.Comment).IsRequired();

            entity.HasOne(tc => tc.Task).WithMany(t => t.Comments).HasForeignKey(tc => tc.TaskId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(tc => tc.User).WithMany(u => u.Comments).HasForeignKey(tc => tc.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        // Demo Kullanıcı
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Username = "demouser",
            Email = "demouser@demo.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
            FirstName = "demo",
            LastName = "user",
            CreatedAt = new DateTime(2026, 8, 7, 0, 0, 0, DateTimeKind.Utc),
            UpdatedAt = new DateTime(2026, 8, 7, 0, 0, 0, DateTimeKind.Utc),
            IsActive = true
        });
    }
}