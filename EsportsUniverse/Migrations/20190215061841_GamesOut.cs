using Microsoft.EntityFrameworkCore.Migrations;

namespace EsportsUniverse.Migrations
{
    public partial class GamesOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayerEvents_Games_GameId",
                table: "GamePlayerEvents");

            migrationBuilder.AlterColumn<int>(
                name: "GameId",
                table: "GamePlayerEvents",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayerEvents_Games_GameId",
                table: "GamePlayerEvents",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayerEvents_Games_GameId",
                table: "GamePlayerEvents");

            migrationBuilder.AlterColumn<int>(
                name: "GameId",
                table: "GamePlayerEvents",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayerEvents_Games_GameId",
                table: "GamePlayerEvents",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
