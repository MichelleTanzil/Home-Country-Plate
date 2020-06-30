using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class cartdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserCart",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Total = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCart_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CartItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    quantity = table.Column<int>(nullable: false),
                    CartId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItem_UserCart_CartId",
                        column: x => x.CartId,
                        principalTable: "UserCart",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserOrders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PurchaseId = table.Column<Guid>(nullable: true),
                    BoughtOn = table.Column<DateTime>(nullable: false),
                    AppUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOrders_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserOrders_UserCart_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "UserCart",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_CartId",
                table: "CartItem",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCart_UserId",
                table: "UserCart",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserOrders_AppUserId",
                table: "UserOrders",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrders_PurchaseId",
                table: "UserOrders",
                column: "PurchaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItem");

            migrationBuilder.DropTable(
                name: "UserOrders");

            migrationBuilder.DropTable(
                name: "UserCart");
        }
    }
}
