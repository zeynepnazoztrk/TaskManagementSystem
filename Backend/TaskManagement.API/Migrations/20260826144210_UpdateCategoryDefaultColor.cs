using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryDefaultColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "Categories",
                type: "character varying(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "#4960a4",
                oldClrType: typeof(string),
                oldType: "character varying(7)",
                oldMaxLength: 7,
                oldDefaultValue: "#007bff");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "PasswordHash",
                value: "$2a$11$6mhd6DR8ptpOCKkZup2kvugglOIAn8aFuibBaWDduoq.WetX48xTi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "Categories",
                type: "character varying(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "#007bff",
                oldClrType: typeof(string),
                oldType: "character varying(7)",
                oldMaxLength: 7,
                oldDefaultValue: "#4960a4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "PasswordHash",
                value: "$2a$11$OZJitkX7C45mLnBTaLxjXOkMhxQOMZOC.IIvq5m6NbOJOnBPHDuvi");
        }
    }
}
