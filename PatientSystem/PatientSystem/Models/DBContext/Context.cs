using Microsoft.EntityFrameworkCore;
using PatientSystem.Models.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.DBContext
{
    public class Context: DbContext
    {
        public Context(DbContextOptions options)
            : base(options)
        {
        }
        public Context(){ }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<PatientEntry> PatientEntry { get; set; }
    }
}
