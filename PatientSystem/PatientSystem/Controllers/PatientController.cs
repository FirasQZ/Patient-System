using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatientSystem.Interface;
using PatientSystem.Models.Classes;
using PatientSystem.ViewModel;

namespace PatientSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatient _Patient;

        public PatientController(IPatient patient)
        {
            _Patient = patient;
        }

        [HttpGet]
        // get all patient
        public IActionResult GetAll()
        {
            List<Patient> PatientList = _Patient.GetAll().ToList();
            return Ok(new
            {
                PatientList
            });
        }

        // post new patient
        [HttpPost("NewPatient")]
        public HttpResponseMessage PostPatient(Patient PatientModal)
        {

            try
            {

                if (ModelState.IsValid)
                {
                    var result = _Patient.CreateNewPatient(PatientModal);
                    if (result > 0)
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                        return response;
                    }
                    else
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.BadRequest
                        };
                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        // post new patient
        [HttpPost("NewPatientRecord")]
        public HttpResponseMessage PostPatientRecord(PatientEntry patientEntry)
        {

            try
            {

                if (ModelState.IsValid)
                {
                    var result = _Patient.CreateNewRecord(patientEntry);
                    if (result > 0)
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                        return response;
                    }
                    else
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.BadRequest
                        };
                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        // get data from tow table ( report )
        [HttpGet("GetReportData")]
        [Produces(typeof(PatientReportVM))]
        public async Task<IActionResult> GetReportData()
        {
            try
            {
                List<PatientReportVM> PatientEntryList = (List<PatientReportVM>)await _Patient.GetReportAsync();
                return Ok(new
                {
                    PatientEntryList
                });
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
