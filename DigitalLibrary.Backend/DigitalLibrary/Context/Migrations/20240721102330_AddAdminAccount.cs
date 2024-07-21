using DigitalLibrary.Context.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Text;

#nullable disable

namespace DigitalLibrary.Context.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminAccount : Migration
    {
        private const string _admin_Firstname = "Admin";
        private const string _admin_Lastname = "User";
        private const string _admin_Username = "admin@digitallibrary.com";
        private const string _admin_Username_Norm = "ADMIN@DIGITALLIBRARY.COM";
        private const string _admin_Email = "admin@digitallibrary.com";
        private const string _admin_Email_Norm = "ADMIN@DIGITALLIBRARY.COM";
        private const string _admin_User_Guid = "b98dadcf-4816-4f79-989e-2d31dfc6cd6f";
        private const string _admin_Role_Guid = "94d00790-d885-49de-8ad4-254ebbf007e4";
        private const string _admin_Password = "Admin@123";
        private const string _admin_Role = "Admin";
        private const string _admin_Role_Norm = "ADMIN";
        private readonly DateTime _admin_Date_Created = DateTime.Now;
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var hasher = new PasswordHasher<User>();
            var passwordHash = hasher.HashPassword(null, _admin_Password);

            StringBuilder sb = new();
            sb.AppendLine("Insert into AspNetUsers(Id, FirstName, LastName, " +
                "UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, " +
                "PasswordHash, PhoneNumberConfirmed, " +
                "TwoFactorEnabled, LockoutEnabled, AccessFailedCount, DateCreated)");
            sb.AppendLine("Values(");
            sb.AppendLine($"'{_admin_User_Guid}'");
            sb.AppendLine($", '{_admin_Firstname}', '{_admin_Lastname}'");
            sb.AppendLine($", '{_admin_Username}', '{_admin_Username_Norm}'");
            sb.AppendLine($", '{_admin_Email}', '{_admin_Email_Norm}', 0");
            sb.AppendLine($", '{passwordHash}', 0, 0, 0, 0");
            sb.AppendLine($", '{_admin_Date_Created:yyyy-MM-dd}')");

            migrationBuilder.Sql(sb.ToString());

            migrationBuilder.Sql($"Insert into AspNetRoles(Id, Name, NormalizedName) " +
                $"values ('{_admin_Role_Guid}', '{_admin_Role}', '{_admin_Role_Norm}')");
            
            migrationBuilder.Sql($"Insert into AspNetUserRoles(UserId, RoleId) " +
                $"values ('{_admin_User_Guid}', '{_admin_Role_Guid}')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"Delete from AspNetUserRoles Where UserId = '{_admin_User_Guid}' and RoleId = '{_admin_Role_Guid}'");
            
            migrationBuilder.Sql($"Delete from AspNetUsers Where Id = '{_admin_User_Guid}'");

            migrationBuilder.Sql($"Delete from AspNetRoles Where Id = '{_admin_Role_Guid}'");
        }
    }
}
