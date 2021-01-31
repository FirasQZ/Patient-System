import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import moment from "moment";
import Swal from "sweetalert2";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  typo:{
    margin: '20px'
  }
}));

  const Patient = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('NewPatient');
  
  const [fields, Setfields] = React.useState({
    Patient_id:"",
    Patient_name:"",
    Patient_date_of_birth:"",  
    Patient_email:"",  
    Patient_address:"",  
  });
  const [fieldsRecord, SetRecord] = React.useState({
    Patient_id:"",
    Disease_name:"",
    Description:"",  
    Entry_date:"",
    Mony_ammount:""
  }); 
  const handleChange = (event, newValue) => {
    setValue(newValue);  
  };
  const handelChangeText = name => event => {
    Setfields({...fields,[name]:event.target.value})
  }
  const handelChangeRecord = name => event => {
    SetRecord({...fieldsRecord,[name]:event.target.value})
  }


  // all patient fill table
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const fetchPatient = () => {  
      fetch("https://localhost:44371/api/patient")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.patientList);
            setIsLoaded(true);
            setItems(result.patientList);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )      
  }      


  // report page , fill table
  const [itemReport, setItemReport] = useState([]);
  const fetchPatientReport = () => {  
    fetch("https://localhost:44371/api/Patient/GetReportData")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.patientEntryList);
          setIsLoaded(true);
          setItemReport(result.patientEntryList);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )      
}      

  // call function when load page
  useEffect(() => {
    fetchPatient();
    fetchPatientReport();
  }, []);
  

// save new patient 
function SaveNewPatient(){
    const  obj = {
      "Patient_id" : Number(fields.Patient_id),
      "Patient_name":fields.Patient_name,
      "Patient_date_of_birth":fields.Patient_date_of_birth,
      "Patient_address":fields.Patient_address,
      "Patient_email":fields.Patient_email     
    } 
    axios.post('https://localhost:44371/api/Patient/NewPatient/',obj)
    .then((response) => {
      Setfields({Patient_id: ''});
      Setfields({Patient_name: '' });
      Setfields({Patient_date_of_birth:''});
      Setfields({Patient_address: '' });
      Setfields({Patient_email: '' });
      Swal.fire({
        // position: 'top-end',
         type: 'success',
         title: 'Success add new patient',
         showConfirmButton: false,
         timer: 1500
       });
       fetchPatient();
       fetchPatientReport();

    },
    (error) => {
      Swal.fire({
        // position: 'top-end',
         type: 'Error',
         title: 'Fail Add New PAtient',
         showConfirmButton: false,
         timer: 1500
       });

    });
}

// add new record for th patient
function SaveNewPatientRecord(){
  
  if(fieldsRecord.Entry_date == "")
  {
    fieldsRecord.Entry_date =moment().format("YYYY-MM-DD");
  }
  else{

  }
  const  obj = {
    "patient_id" : Number(fieldsRecord.patient_id),
    "Disease_name":fieldsRecord.Disease_name,
    "Description":fieldsRecord.Description,
    "Entry_date":fieldsRecord.Entry_date,
    "Mony_ammount":fieldsRecord.Mony_ammount     
  } 
  axios.post('https://localhost:44371/api/Patient/NewPatientRecord/',obj)
  .then((response) => {
    SetRecord({patient_id: ''});
    SetRecord({Disease_name: ''});
    SetRecord({Description: '' });
    SetRecord({Entry_date:''});
    SetRecord({Mony_ammount: '' });
    Swal.fire({
      // position: 'top-end',
       type: 'success',
       title: 'Success add record for the patient',
       showConfirmButton: false,
       timer: 1500
     });
     fetchPatient();
     fetchPatientReport();

  },
  (error) => {
    Swal.fire({
      // position: 'top-end',
       type: 'error',
       title: 'Fail add new record',
       showConfirmButton: false,
       timer: 1500
     });

  });
}

  return (
<div className={classes.root}>
      <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
        <Tab
          value="NewPatient"
          label="New Patient"
          {...a11yProps('NewPatient')}
        />
        <Tab value="AllPatient" label="All Patient" {...a11yProps('AllPatient')} />
        <Tab value="records" label="New Records" {...a11yProps('records')} />
        <Tab value="Report" label="Report" {...a11yProps('Report')} />
      </Tabs>
      <TabPanel value={value} index="NewPatient">
      <div>
        <form>
          <TextField
            value ={fields.Patient_id} onChange={handelChangeText("Patient_id")}
            id="Patient_id"
            label="Patient Id"
            style={{ margin: 8 }}
            placeholder="Patient id"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fields.Patient_name} onChange={handelChangeText("Patient_name")}
            id="Patient_name"
            label="Patient Name"
            style={{ margin: 8 }}
            placeholder="Patient name"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fields.date_of_birth} onChange={handelChangeText("date_of_birth")}
            id="date_of_birth"
            type="date"
            label="Date of birth"
            style={{ margin: 8 }}
            placeholder="Date Of Birth"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fields.Patient_address} onChange={handelChangeText("Patient_address")}
            id="Patient_address"
            label="Patient Address"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fields.Patient_email} onChange={handelChangeText("Patient_email")}
            id="Patient_email"
            label="Patient Email"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />        
        </form>
        <button color="secondary" onClick={SaveNewPatient} >Save</button>
      </div>
      </TabPanel>
      <TabPanel value={value} index="AllPatient">
        <style>
          {
          "table {border:1px solid black;text-align: center;width: 100% !important} table th{background-color: #cecccc;} table td {border:1px solid black;} btn_report {float: right;} "          
        }
        </style>
            <h3>All Patient </h3><br></br>
            <table>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Date Of Birth</th>
                <th>Patient Address</th>
                <th>Patient Email</th>
                <th>Action</th>
              </tr>
              {items.map(item => (
              <tr>
                <td>
                    {item.patient_id}
                  </td>
                  <td>
                    {item.patient_Name}
                  </td>
                  <td>
                    {item.patient_DateOfBirth}
                  </td>
                  <td>
                    {item.patient_Address}
                  </td>
                  <td>
                    {item.patient_Email}
                  </td>
                  <td>
                    <button id="btn_edit">Edit</button>
                    <button id="btn_report">Report</button>
                  </td>
              </tr>
            ))}
            </table>
      </TabPanel>
      <TabPanel value={value} index="records">
      <style>
          {
          ".MuiFormControl-root{width:100% !important;} #form2{margin-top: 50px;} #btn_new_record{background-color: #218a8c;border: none;width: 100px;height: 30px;margin-left: 10px;color: white;}"          
        }
        </style>
        <div>
          <form>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Chose Patient</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handelChangeRecord("patient_id")}
                  value={fieldsRecord.Patient_id}
                >
              {items.map(item => ( 
                <MenuItem   value={item.patient_id}>{item.patient_Name} - {item.patient_id}</MenuItem>
              ))}
                </Select>
              </FormControl>                
          </form>          
          </div>
          <div>
        <form id="form2">
          <TextField
            value ={fieldsRecord.Disease_name} onChange={handelChangeRecord("Disease_name")}
            id="disease"
            label="Disease Name"
            style={{ margin: 8 }}
            placeholder="Disease Name"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fieldsRecord.Description} onChange={handelChangeRecord("Description")}
            id="Description"
            label="Description"
            style={{ margin: 8 }}
            placeholder="Description"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fieldsRecord.Entry_date} onChange={handelChangeRecord("Entry_date")}
            id="Time_of_entry"
            label="Time of Entry"
            type="date"
            style={{ margin: 8 }}
            placeholder="Time of Entry"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value ={fieldsRecord.Mony_ammount} onChange={handelChangeRecord("Mony_ammount")}
            id="Money_mount"
            label="Money Amount"
            style={{ margin: 8 }}
            placeholder="Money Amount"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

        </form>
        <button id="btn_new_record" color="secondary" onClick={SaveNewPatientRecord} >Save</button>
      </div>
      </TabPanel>
      <TabPanel value={value} index="Report">
      <style>
          {
          "table {border:1px solid black;text-align: center;width: 100% !important} table th{background-color: #cecccc;} table td {border:1px solid black;} btn_report {float: right;} "          
        }
        </style>
            <h3>Patient Reports </h3><br></br>
            <table>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Patient Age</th>
                <th>Avarage Bill</th>
                <th>Most Month Visit Patient</th>
              </tr>
              {itemReport.map(iReport => (
              <tr>
                <td>
                    {iReport.patient_id}
                  </td>
                  <td>
                    {iReport.patient_Name}
                  </td>
                  <td>
                    {iReport.patient_age}
                  </td>
                  <td>
                    {iReport.avg_mony_ammount}
                  </td>
                  <td>
                    {iReport.most_month_visit}
                  </td>
              </tr>
            ))}
            </table>

      </TabPanel>

    </div>
  );
};

export default Patient;
