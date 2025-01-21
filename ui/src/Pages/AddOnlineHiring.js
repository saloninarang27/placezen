import React, { useState } from "react";
import "../CSS/AddOnlineHiring.css";
import { Link, useParams } from "react-router-dom";
function AddOnlineHiring(){
  let {Id}=useParams();
  let[cname,setcname]=useState("");
  let[alink,setalink]=useState("");
  let[role,setrole]=useState("");
  
  function input1(event){
    setcname(event.target.value);
    console.log(event.target.value);
  }
  function input2(event){
    setrole(event.target.value);
    console.log(event.target.value);
  }
  function input3(event){
    setalink(event.target.value);
    console.log(event.target.value);
  }
  function submit(event){
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('Company',cname)
    formdata.append('Role',role)
    formdata.append('Apply',alink)
   
    fetch('http://localhost:5000/AddOn/Online', {
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
       <div id="bcd" style={{paddingLeft:"18%"}}> I.K. Gujral Punjab Technical University</div>
       <div  id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll" style={{textDecoration:"none"}} to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          <Link id="llll" style={{textDecoration:"none"}} to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
           <Link id="llll" style={{textDecoration:"none"}} to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui" style={{paddingLeft:"10%",marginTop:"2vh",color:"red"}}>Add Online Hirings</div>
       <div id="yess" style={{marginLeft:"25%",width:"60vw"}}>
        <label>Company Name</label><br></br>
        <input placeholder="Company Name" value={cname} onChange={input1}></input><br></br>
        <label>Role</label><br></br>
        <input placeholder="Role" value={role} onChange={input2}></input><br></br>
        <label>Apply Link</label><br></br>
        <input placeholder="Apply Link" value={alink} onChange={input3}></input><br></br><br></br>
        <div className="upload-container" style={{marginLeft:"45%"}}>
        <button className="upload-btn" onClick={submit} >
          Submit
        </button>
      </div>
       </div>
    </div>
   
  )
}
export default AddOnlineHiring;