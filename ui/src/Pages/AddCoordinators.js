import React, { useState } from "react";
import "../CSS/AddOnlineHiring.css";
import { Link, useParams } from "react-router-dom";
function AddCoorniators(){
  let {Id}=useParams();

  let[name,setname]=useState("");
  let[branch,setbranch]=useState("");
  let[semester,setsemester]=useState("");
  let[contact,setcontact]=useState("");
  let[email,setemail]=useState("");
  let[username,setusername]=useState("");
  let[password,setpassword]=useState("");

  function input1(event){
    setname(event.target.value);
    console.log(event.target.value);
  }
  function input2(event){
    setbranch(event.target.value);
    console.log(event.target.value);
  }
  function input3(event){
    setsemester(event.target.value);
    console.log(event.target.value);
  }
  function input4(event){
    setcontact(event.target.value);
    console.log(event.target.value);
  }
  function input5(event){
    setemail(event.target.value);
    console.log(event.target.value);
  }
  function input6(event){
    setusername(event.target.value);
    console.log(event.target.value);
  }
  function input7(event){
    setpassword(event.target.value);
    console.log(event.target.value);
  }

  function submit(event){
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('Name',name)
    formdata.append('Branch',branch)
    formdata.append('Semester',semester)
    formdata.append('Contact',contact)
    formdata.append('Email',email)
    formdata.append('UserName',username)
    formdata.append('Password',password)
   
    fetch('http://localhost:8050/TP/cell', {
      method:'POST',
      body: formdata,
    
    })
      .then(response => response.text())
      .then(data => {
        console.log('Added successful:', data);
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
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll"  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          <Link id="llll" to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
           <Link id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui">Add Coordinators</div>
       <div id="yess">
        <label>Name</label><br></br>
        <input placeholder="Name" value={name} onChange={input1}></input><br></br>
        <label>Branch</label><br></br>
        <input placeholder="Branch" value={branch} onChange={input2}></input><br></br>
        <label>Semester</label><br></br>
        <input placeholder="Semester" value={semester} onChange={input3}></input><br></br>
        <label>Contact</label><br></br>
        <input placeholder="Mobile number" value={contact} onChange={input4}></input><br></br>
        <label>Email</label><br></br>
        <input placeholder="Email" value={email} onChange={input5}></input><br></br>
        <label>UserName</label><br></br>
        <input placeholder="UserName" value={username} onChange={input6}></input><br></br>
        <label>Password</label><br></br>
        <input placeholder="Password" value={password} onChange={input7}></input><br></br><br></br>
        <button onClick={submit}>Add</button>
       </div>
    </div>
   
  )
}
export default AddCoorniators;