import React, { useState } from "react";
import "../CSS/AddHiring.css"
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
function AddHiring(){
  let {Id}=useParams();
  let[Company,setCompany]=useState("");
  let[Role,setRole]=useState("");
  let[Cgpa,setCgpa]=useState();
  let[CTC,setCTC]=useState();
  let[Backlogs,setBacklogs]=useState();
  let[Session,setSession]=useState();
  let[Semester,setSemester]=useState("");
  let[Branch,setBranch]=useState("");
  let[Description,setdescription]=useState("");
  let[location,setlocation]=useState("");
  let[date1,setdate1]=useState("");
  let[date2,setdate2]=useState("");

  function input1(event){
    console.log(event.target.value)
    setCompany(event.target.value)
  }
  function input2(event){
    console.log(event.target.value)
    setRole(event.target.value)
  }
  function input3(event){
    console.log(event.target.value)
    setCgpa(event.target.value)
  }
  function input12(event){
    console.log(event.target.value)
    setCTC(event.target.value)
  }
  function input4(event){
    console.log(event.target.value)
    setBacklogs(event.target.value)
  }
  function input5(event){
    console.log(event.target.value)
    setSession(event.target.value)
  }
  function input6(event){
    console.log(event.target.value)
    setSemester(event.target.value)
  }
  function input7(event){
    console.log(event.target.value)
    setBranch(event.target.value)
  }
  function input8(event){
    console.log(event.target.value)
    setdescription(event.target.value)
  }
  function input9(event){
    console.log(event.target.value)
    setlocation(event.target.value)
  }
  function input10(event){
    console.log(event.target.value)
    setdate1(event.target.value)
  }
  function input11(event){
    console.log(event.target.value)
    setdate2(event.target.value)
  }
//   function submitadd(event){
//     event.preventDefault();
//     const formdata = new FormData();
//     formdata.append('company',Company)
//     formdata.append('role',Role)
//     formdata.append('cgpa',Cgpa)
//     formdata.append('CTC',CTC)
//     formdata.append('backlog',Backlogs)
//     formdata.append('session',Session)
//     formdata.append('semester',Semester)
//     formdata.append('branch',Branch)
//     formdata.append('desciption',Description)
//     formdata.append('Location',location)
//     formdata.append('Date1',date1)
//     formdata.append('Date2',date2)
  
//     fetch('http://localhost:5000/Hiring/add', {
//       method:'POST',
//       body: formdata,
    
//     })
//     .then((data) => {
//       if (data.id) {
//         alert(`Added Successfully! Hiring ID: ${data.id}`); // Display ID in alert
//         console.log('Added successfully:', data);
//       } else {
//         alert('Added Successfully but no ID was returned.');
//       }
//     })
//     .catch((error) => {
//       console.error('Error during Added:', error);
//     });
// }


function submitadd(event) {
  event.preventDefault();
  const formdata = new FormData();
  formdata.append('company', Company);
  formdata.append('role', Role);
  formdata.append('cgpa', Cgpa);
  formdata.append('CTC', CTC);
  formdata.append('backlog', Backlogs);
  formdata.append('session', Session);
  formdata.append('semester', Semester);
  formdata.append('branch', Branch);
  formdata.append('desciption', Description);
  formdata.append('Location', location);
  formdata.append('Date1', date1);
  formdata.append('Date2', date2);

  // Add hiring
  fetch('http://localhost:5000/Hiring/add', {
    method: 'POST',
    body: formdata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add hiring');
      }
      return response.json(); // Parse response as JSON
    })
    .then((data) => {
      if (data && data.id) {
        alert(`Added Successfully! Hiring ID: ${data.id}`);
        console.log('Added successfully:', data);

        // Call the status add API with the hiring ID
        return fetch(`http://localhost:5000/status/add/${data.id}`, {
          method: 'POST',
        });
      } else {
        alert('Added Successfully but no ID was returned.');
        throw new Error('No ID returned from hiring add API');
      }
    })
    .then((statusResponse) => {
      if (!statusResponse.ok) {
        throw new Error('Failed to add status');
      }
      return statusResponse.text(); // Handle response from status API
    })
    .then((statusData) => {
      alert(`Status Added Successfully: ${statusData}`);
      console.log('Status added successfully:', statusData);
    })
    .catch((error) => {
      console.error('Error during operation:', error);
    });
}

  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statics" },
    { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];

  return(
    <div>
      <div id="bcd"> I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <div id="iui">Add Hirings</div>
      <div id="fd22">
        <div>
        <label>Name of Company</label><br></br>
        <input placeholder="Company" onChange={input1} value={Company}/><br></br>
        <label>Role</label><br></br>
        <input placeholder="Skills Required" onChange={input2} value={Role}/><br></br>
        <label>Cgpa</label><br></br>
        <input placeholder="Average CGPA " onChange={input3} value={Cgpa}/><br></br>
        <label>Package Offered</label><br></br>
        <input placeholder="Average CTC " onChange={input12} value={CTC}/><br></br>
        <label>Number of Backlogs</label><br></br>
        <input placeholder="Backlogs" onChange={input4} value={Backlogs}/><br></br>
        
        <label>Start Session</label><br></br>
        <input placeholder="Session" onChange={input5} value={Session}/><br></br>
        <label>Semester</label><br></br>
        <input placeholder="Semester" onChange={input6} value={Semester}/><br></br>
        </div>
        <div>
        <label>Branch</label><br></br>
        <input placeholder="Branch" onChange={input7} value={Branch}/><br></br>

        <label>Description</label><br></br>
        <input placeholder="Description" onChange={input8} value={Description}/><br></br>
        <label>Location</label><br></br>
        <input placeholder="location" onChange={input9} value={location}/><br></br>
        <label>StartDate</label><br></br>
        <input placeholder="Start Date" type="date" onChange={input10} value={date1}/><br></br>
        <label>EndDate</label><br></br>
        <input placeholder="End Date" type="date" onChange={input11} value={date2}/><br></br>
        <br></br><button onClick={submitadd} style={{ width:'80%', backgroundColor: 'green', color: '#fff', marginLeft:'10%',marginRight: '8%', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submitt</button></div>
        {/* <button onClick={submitadd}>Add</button> */}
        
      </div>
      
    </div>
  )

}
export default AddHiring;