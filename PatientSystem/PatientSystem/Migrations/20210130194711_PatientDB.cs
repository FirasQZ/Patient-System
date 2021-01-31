using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PatientSystem.Migrations
{
    public partial class PatientDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    Patient_Seq_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Patient_id = table.Column<int>(nullable: false),
                    Patient_Name = table.Column<string>(nullable: true),
                    Patient_DateOfBirth = table.Column<DateTime>(nullable: false),
                    Patient_Address = table.Column<string>(nullable: true),
                    Patient_Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.Patient_Seq_id);
                });

            migrationBuilder.CreateTable(
                name: "PatientEntry",
                columns: table => new
                {
                    entry_Seq = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    patient_Id = table.Column<int>(nullable: false),
                    Disease_name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Mony_ammount = table.Column<string>(nullable: true),
                    Entry_Date = table.Column<DateTime>(nullable: false),
                    Patient_Seq_id = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientEntry", x => x.entry_Seq);
                    table.ForeignKey(
                        name: "FK_PatientEntry_Patient_Patient_Seq_id",
                        column: x => x.Patient_Seq_id,
                        principalTable: "Patient",
                        principalColumn: "Patient_Seq_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatientEntry_Patient_Seq_id",
                table: "PatientEntry",
                column: "Patient_Seq_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientEntry");

            migrationBuilder.DropTable(
                name: "Patient");
        }
    }
}
