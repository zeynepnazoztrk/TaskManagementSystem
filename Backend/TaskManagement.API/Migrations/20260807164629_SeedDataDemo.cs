using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataDemo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "UpdatedAt", "Username" },
                values: new object[] { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 8, 7, 0, 0, 0, 0, DateTimeKind.Utc), "demouser@demo.com", "demo", true, "user", "$2a$11$OZJitkX7C45mLnBTaLxjXOkMhxQOMZOC.IIvq5m6NbOJOnBPHDuvi", new DateTime(2026, 8, 7, 0, 0, 0, 0, DateTimeKind.Utc), "demouser" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));
        }
    }
}
