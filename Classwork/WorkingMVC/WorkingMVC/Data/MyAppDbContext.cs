using WorkingMVC.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WorkingMVC.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace WorkingMVC.Data;
//Замінали DbContext на IdentityDbContext, добавили:
//UserEntity (таблиця користувачів),
//RoleEntity (таблиця ролей),
//IdentityUserClaim (таблиця додаткової інформації для корустувачів),
//UserRoleEntity (таблиця користувачів та їх ролей),
//IdentityUserLogin (таблиця яка представляє запис про зовнішній логін користувачів),
//IdentityRoleClaim (таблиця додаткової інформації для ролей),
//IdentityUserToken (таблиця токенів які видаються користувачам для певних задач)
public class MyAppDbContext : IdentityDbContext<UserEntity, RoleEntity, int, IdentityUserClaim<int>, UserRoleEntity,IdentityUserLogin<int>,IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public MyAppDbContext(DbContextOptions<MyAppDbContext> dbContextOptions)
        : base(dbContextOptions)
    { }

    //Це таблиця в БД
    public DbSet<CategoryEntity> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //
        builder.Entity<UserRoleEntity>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId);

        builder.Entity<UserRoleEntity>()
           .HasOne(ur => ur.Role)
           .WithMany(u => u.UserRoles)
           .HasForeignKey(ur => ur.RoleId);
    }
}