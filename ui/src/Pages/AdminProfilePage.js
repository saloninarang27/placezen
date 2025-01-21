import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/StProfile.css"
import "../CSS/AdminProfilePage.css"
import girl from "../Pics/girl.jpg"
import boy from "../Pics/boy.jpg"
function AdminProfilePage(){
  let[pr,setprofil]=useState("");
  let {Id}=useParams();
   useEffect( ()=>{
   const fetchData = async () => {
     try {
         const response = await fetch(`http://localhost:5000/Admin/getAdmin/${Id}`);
         if (!response.ok) {
           throw new Error('Network response was not okk');
         }
          const data = await response.json();
         console.log(data);
         setprofil(data);
       } 
       catch (error) {
         console.error('Error fetching data: ', error.message);
       }
 }  ;
 if(1)
 {
     fetchData();
 }        
  },[1])
  return(
    <div>
      <div id="bcd"> I.K. Gujral Punjab Technical University</div>
      
      <div  id="mySidebar">
      <span className="s2" id="sus">Welcome   </span>
          <span className="s1"><img id ="simg" height="120" width="120" src={boy}  alt="no-im"></img></span>
          <Link id="llll"  style={{textDecoration:"none"}} to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          <Link id="llll"  style={{textDecoration:"none"}} to={`/changePass/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Password</span></Link>
           <Link id="llll" style={{textDecoration:"none"}} to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      
        <div className="conti" >

      <div id="sidu" style={{marginLeft:"5%"}}>
       {/* <div id="sidudd"><center><h2>About</h2></center></div> */}
       <span><b><center>Personal Details</center></b></span><br></br>
       <div>

       <div id="sidud">
      <div id="sidudd">Full Name </div>
        <div id="sidudd"> {pr.name}</div>
        
      </div>

       <div id="sidud">
        <div id="sidudd">Designation</div>
        <div id="sidudd">{pr.designation}</div>
      </div>

      

      <div id="sidud">
      <div id="sidudd">Department </div>
        <div id="sidudd">{pr.department}</div>
       </div>

       </div>
      </div>


      <div id="sidu">
      <span><b><center>Contact Details</center></b></span><br></br>
       <div>

       <div id="sidud">
      <div id="sidudd">Phone number  </div>
        <div id="sidudd"> {pr.phone}</div>
        
      </div>

       <div id="sidud">
        <div id="sidudd">Email</div>
        <div id="sidudd">{pr.email}</div>
      </div>

      

      <div id="sidud">
      <div id="sidudd">Linkedin </div>
        <div id="sidudd">{pr.linkedin}</div>
       </div>



       </div>

       
      </div>


      {/* <div id="sidu">
       <div id="sidudd"><center><h2>About</h2></center></div>
       <div>

       <div id="sidud">
      <div id="sidudd">Full Name </div>
        <div id="sidudd"> {pr.name}</div>
        
      </div>

       <div id="sidud">
        <div id="sidudd">Position</div>
        <div id="sidudd">{pr.designation}</div>
      </div>

      

      <div id="sidud">
      <div id="sidudd">Department </div>
        <div id="sidudd">{pr.department}</div>
       </div>



       </div>

       
      </div> */}
      
</div>


<div className="conti">

<div id="sidu">
 {/* <div id="sidudd"><center><h2>About</h2></center></div> */}
 <span><b><center>Login Details</center></b></span><br></br>
 <div>

 <div id="sidud">
<div id="sidudd">Username </div>
  <div id="sidudd"> {pr.username}</div>
  
</div>

 <div id="sidud">
  <div id="sidudd">Password</div>
  <div id="sidudd" >{pr.password}</div>
  
</div>
<div><Link to="#"><center>change password</center></Link></div>







 </div>

 
</div>




</div>

     
    </div>
  )
}
export default AdminProfilePage;
