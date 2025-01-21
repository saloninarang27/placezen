import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/AddOnlineHiring.css";
function AddHiringStudent(){
  let{Id}=useParams();
  let[companyName,setcompanyName]=useState("");
  let[role,setrole]=useState("");
  let[link,setlink]=useState("");
  
  function input1(event){
    setcompanyName(event.target.value);
    console.log(event.target.value);
  }
  function input2(event){
    setrole(event.target.value);
    console.log(event.target.value);
  }
  function input3(event){
    setlink(event.target.value);
    console.log(event.target.value);
  }
  function submit(event){
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('Company',companyName)
    formdata.append('Role',role)
    formdata.append('Apply',link)
    formdata.append('SId',Id)
   
    fetch('http://localhost:8050/OnlineApproval/adds', {
      method:'POST',
      body: formdata,
    
    })
      .then(response => response.text())
      .then(data => {
        console.log('Request sent successful:', data);
      })
      .catch(error => {
        console.error('Error during Added:', error);
      });
  }


  return(
    <div>
       <div id="bcd"> I.K. Gujral Punjab Technical University</div>
       <div  id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
        <Link id="llll"  to={`/StudentProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll" to={`/AddHiringStudent/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Post Online Hiring</span></Link>
          <Link id="llll" to={`/stPostMaterial/${Id}`} > <span  className="s1" style={{ fontSize: '20px' }}>Post Material</span></Link>
           <Link id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui">Post Online Hiring</div>
       <div id="yess">
        <label>Company Name</label><br></br>
        <input placeholder="Company Name" value={companyName} onChange={input1}></input><br></br>
        <label>Role</label><br></br>
        <input placeholder="Role" value={role} onChange={input2}></input><br></br>
        <label>Apply Link</label><br></br>
        <input placeholder="Apply Link" value={link} onChange={input3}></input><br></br><br></br>
        {/* <button onClick={submit}>Send Request</button> */}
        <button onClick={submit}style={{backgroundColor: 'green', color: '#fff', marginLeft: '10%', marginRight: '10%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send Request</button>
       </div>
    </div>
   
  )
}
export default AddHiringStudent;