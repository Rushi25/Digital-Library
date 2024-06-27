using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalLibrary.Context.Migrations
{
    /// <inheritdoc />
    public partial class updatedCategoryItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTimeItemReleased",
                table: "CategoryItem",
                newName: "DateItemReleased");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateItemReleased",
                table: "CategoryItem",
                newName: "DateTimeItemReleased");
        }
    }
}
