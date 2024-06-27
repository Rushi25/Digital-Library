using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalLibrary.Context.Migrations
{
    /// <inheritdoc />
    public partial class updatedCategoryItemColoumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateItemReleased",
                table: "CategoryItem",
                newName: "DateReleased");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateReleased",
                table: "CategoryItem",
                newName: "DateItemReleased");
        }
    }
}
