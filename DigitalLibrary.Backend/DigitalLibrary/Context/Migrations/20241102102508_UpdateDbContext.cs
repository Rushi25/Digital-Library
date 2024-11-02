using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalLibrary.Context.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryItem_Category_CategoryId",
                table: "CategoryItem");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryItem_MediaType_MediaTypeId",
                table: "CategoryItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Content_CategoryItem_CategoryItemId",
                table: "Content");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCategory_AspNetUsers_UserId",
                table: "UserCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCategory_Category_CategoryId",
                table: "UserCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCategory",
                table: "UserCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MediaType",
                table: "MediaType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Content",
                table: "Content");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryItem",
                table: "CategoryItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "UserCategory",
                newName: "UserCategories");

            migrationBuilder.RenameTable(
                name: "MediaType",
                newName: "MediaTypes");

            migrationBuilder.RenameTable(
                name: "Content",
                newName: "Contents");

            migrationBuilder.RenameTable(
                name: "CategoryItem",
                newName: "CategoryItems");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_UserCategory_UserId",
                table: "UserCategories",
                newName: "IX_UserCategories_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCategory_CategoryId",
                table: "UserCategories",
                newName: "IX_UserCategories_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Content_CategoryItemId",
                table: "Contents",
                newName: "IX_Contents_CategoryItemId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryItem_MediaTypeId",
                table: "CategoryItems",
                newName: "IX_CategoryItems_MediaTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryItem_CategoryId",
                table: "CategoryItems",
                newName: "IX_CategoryItems_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCategories",
                table: "UserCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MediaTypes",
                table: "MediaTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contents",
                table: "Contents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryItems",
                table: "CategoryItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryItems_Categories_CategoryId",
                table: "CategoryItems",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryItems_MediaTypes_MediaTypeId",
                table: "CategoryItems",
                column: "MediaTypeId",
                principalTable: "MediaTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_CategoryItems_CategoryItemId",
                table: "Contents",
                column: "CategoryItemId",
                principalTable: "CategoryItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCategories_AspNetUsers_UserId",
                table: "UserCategories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCategories_Categories_CategoryId",
                table: "UserCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryItems_Categories_CategoryId",
                table: "CategoryItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryItems_MediaTypes_MediaTypeId",
                table: "CategoryItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Contents_CategoryItems_CategoryItemId",
                table: "Contents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCategories_AspNetUsers_UserId",
                table: "UserCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCategories_Categories_CategoryId",
                table: "UserCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCategories",
                table: "UserCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MediaTypes",
                table: "MediaTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contents",
                table: "Contents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryItems",
                table: "CategoryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "UserCategories",
                newName: "UserCategory");

            migrationBuilder.RenameTable(
                name: "MediaTypes",
                newName: "MediaType");

            migrationBuilder.RenameTable(
                name: "Contents",
                newName: "Content");

            migrationBuilder.RenameTable(
                name: "CategoryItems",
                newName: "CategoryItem");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_UserCategories_UserId",
                table: "UserCategory",
                newName: "IX_UserCategory_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCategories_CategoryId",
                table: "UserCategory",
                newName: "IX_UserCategory_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Contents_CategoryItemId",
                table: "Content",
                newName: "IX_Content_CategoryItemId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryItems_MediaTypeId",
                table: "CategoryItem",
                newName: "IX_CategoryItem_MediaTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryItems_CategoryId",
                table: "CategoryItem",
                newName: "IX_CategoryItem_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCategory",
                table: "UserCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MediaType",
                table: "MediaType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Content",
                table: "Content",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryItem",
                table: "CategoryItem",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryItem_Category_CategoryId",
                table: "CategoryItem",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryItem_MediaType_MediaTypeId",
                table: "CategoryItem",
                column: "MediaTypeId",
                principalTable: "MediaType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Content_CategoryItem_CategoryItemId",
                table: "Content",
                column: "CategoryItemId",
                principalTable: "CategoryItem",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCategory_AspNetUsers_UserId",
                table: "UserCategory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCategory_Category_CategoryId",
                table: "UserCategory",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
