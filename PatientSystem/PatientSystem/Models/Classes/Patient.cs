using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.Models.Classes
{
    public class Patient
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Patient_Seq_id { get; set; }               
        public int Patient_id { get; set; }
        public String Patient_Name { get; set; }
        public DateTime Patient_DateOfBirth { get; set; }
        public string Patient_Address { get; set; }
        public string Patient_Email { get; set; }

    }
}
