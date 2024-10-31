using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalLibrary.Context.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRole : Migration
    {
        private const string _user_Role_Guid = "f60c7569-c6dd-490c-8aaf-af84361e8774";
        private readonly string _user_Role = Role.User.ToString();
        private readonly string _user_Role_Norm = Role.User.ToString().ToUpperInvariant();
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"Insert into AspNetRoles(Id, Name, NormalizedName) " +
                $"values ('{_user_Role_Guid}', '{_user_Role}', '{_user_Role_Norm}')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"Delete from AspNetRoles Where Id = '{_user_Role_Guid}'");
        }
    }
}
