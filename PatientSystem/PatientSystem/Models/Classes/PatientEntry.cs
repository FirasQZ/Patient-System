using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.Models.Classes
{
    public class PatientEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int entry_Seq { get; set; }
        public int patient_Id { get; set; }
        public String Disease_name { get; set; }
        public String Description { get; set; }
        public String Mony_ammount { get; set; }
        public DateTime Entry_Date { get; set; }       
        public virtual Patient patient { get; set; }

    }
}
