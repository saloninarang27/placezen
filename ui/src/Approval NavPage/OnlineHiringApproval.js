import React, { useState ,useEffect} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
function OnlineHiringApproval(){
  let {Id} = useParams();
  let[requests,setRequests]=useState("");
  let[status,setStatus]=useState(1);
  const navigate = useNavigate();
  useEffect( ()=>{
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/OnlineApproval/allApprovals`);
          if (!response.ok) {
            throw new Error('Network response was not okk');
          }
          const data = await response.json();
          console.log(data);
          setRequests(data);
          
        } 
        catch (error) {
          console.error('Error fetching data: ', error.message);
        }
  }  ;
  if(1)
  {
      fetchData();
  }        
   },[status])

   const next = async (request)=>{
    const formdata = new FormData();
    formdata.append('Company',request.companyName)
    formdata.append('Role',request.role)
    formdata.append('Apply',request.link)
    fetch('http://localhost:5000/OnlineApproval/adds', {
      method:'POST',
      body: formdata,
    
    })
      .then(response => response.text())
      .then(data => {
        console.log('SignUp successful:', data);
      })
      .catch(error => {
        console.error('Error during SignUp:', error);
      });
  }
  return(
    <div>
      <div id="header2"> I.K. Gujral Punjab Technical University</div>
       <div id="navbar1">
        <Link id="lul" to={`/AdminApprovals/${Id}`}><div id="navbox1">Online Hiring Request</div></Link>
        <div id="navbox2">SignUp Request</div>
        <Link id="lul" ><div id="navbox3">Profile Edit Request</div></Link>
        <Link id="lul" to={`/removeStudents/${Id}`}><div id="navbox4">Remove Student</div></Link>
        <Link id="lul"><div id="navbox5">Add Admins</div></Link>
       </div>

       <div id="doremon">
        { requests && requests.map(request =>(
           <div id="thisthat">
            <h3>Company : {request.companyNamey}</h3>
            <h3>Role : {request.role}</h3>
            <h3>Apply Here :{request.link}</h3>
            <h1><button onClick={() => next(request)}style={{ width: '80px', color:"crimson" }}>Add</button></h1>
           </div>
        ))
        }
       </div>
    </div>
  )
}
export default OnlineHiringApproval;