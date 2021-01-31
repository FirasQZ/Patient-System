using PatientSystem.Models.Classes;
using PatientSystem.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.Interface
{
    public interface IPatient
    {
        int CreateNewPatient(Patient PatientModel);
        int CreateNewRecord(PatientEntry patientEntry);
        IEnumerable<Patient> GetAll();
        Task<List<PatientReportVM>> GetReportAsync();

    }
}
