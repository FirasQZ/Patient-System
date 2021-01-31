using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.ViewModel
{
    public class PatientReportVM
    {
        public int Patient_id { get; set; }
        public String Patient_Name { get; set; }
        public int Patient_age { get; set; }
        public int Avg_mony_ammount { get; set; }
        public String other_patient { get; set; }
        public int Most_month_visit { get; set; }

    }
}
