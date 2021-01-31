using Microsoft.EntityFrameworkCore;
using PatientSystem.DBContext;
using PatientSystem.Interface;
using PatientSystem.Models.Classes;
using PatientSystem.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientSystem.Concrete
{
    public class PatientData : IPatient
    {
        Context db = new Context();
        private readonly Context _db;

        public PatientData(Context db)
        {
            this._db = db;
        }


        // add new Patient
        public int CreateNewPatient(Patient PatientModel)
        {
            try
            {
                DefaultRecord(PatientModel);
                _db.Patient.Add(PatientModel);
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }
        private void DefaultRecord(Patient PatientModel)
        {
            PatientEntry patientEntry = new PatientEntry();
            patientEntry.patient_Id = PatientModel.Patient_id;
            patientEntry.Disease_name = "";
            patientEntry.Description = "";
            patientEntry.Mony_ammount = "";
            CreateNewRecord(patientEntry);
        }

        // get all Patient
        public IEnumerable<Patient> GetAll()
        {
            try
            {

                return _db.Patient.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int CreateNewRecord(PatientEntry patientEntry)
        {
            try
            {
                _db.PatientEntry.Add(patientEntry);
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }
        public async Task<List<PatientReportVM>> GetReportAsync()
        {
            try
            {
                PatientReportVM PVM;
                List<PatientReportVM> ListPVM = new List<PatientReportVM>();
                var data = await _db.PatientEntry
                                .Include(e => e.patient).Distinct().ToListAsync();
                var DataGroupByPatientId = data.GroupBy(e => e.patient_Id);
                foreach (var Row in DataGroupByPatientId) 
                {
                    int totalBillForEachPaient = 0;
                    PVM = new PatientReportVM();
                    var DataGroupByMonth = Row.OrderBy(e => e.Entry_Date).GroupBy(e => e.Entry_Date);
                    var count = 0;
                    var Max = 0;
                    int month = 0 ;
                    foreach (var RowByMonth in DataGroupByMonth)
                    {
                       
                        count = 0;
                        foreach (var vm in RowByMonth) 
                        {
                            count++;
                            PVM.Patient_id = vm.patient_Id;
                            PVM.Patient_Name = vm.patient.Patient_Name;
                            totalBillForEachPaient += Convert.ToInt32(vm.Mony_ammount);                            
                            PVM.Patient_age = CalculateAge(vm.patient.Patient_DateOfBirth);
                        }
                        if (count >= Max)
                        {
                            Max = count;
                            month = RowByMonth.Key.Month;
                        }
                    }
                    PVM.Most_month_visit = month;
                    PVM.Avg_mony_ammount = Row.Count()>0 ? totalBillForEachPaient / Row.Count():0;
                    ListPVM.Add(PVM);
                }
                return ListPVM.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        // calculate Age
        private int CalculateAge(DateTime date_of_birth)
        {
            try
            {
                int Patient_age = DateTime.Now.Year - date_of_birth.Year;
                return Patient_age;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }
    }
}
