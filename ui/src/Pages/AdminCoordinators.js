import React, { useEffect, useState } from "react";
import "../CSS/OnlineHiring.css";
import { Link, useParams } from "react-router-dom";
function AdminCoordinator(){
  let[tp,settp]=useState("");
   let {Id}=useParams();
    useEffect( ()=>{
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/TP/total`);
          if (!response.ok) {
            throw new Error('Network response was not okk');
          }
          const data = await response.json();
          console.log(data);
          settp(data);
          console.log(tp); 
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
        <div  id="mySidebar" >
        <span className="s2" id="sus">Welcome</span>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link style={{textDecoration:"none"}} id="llll"  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          <Link style={{textDecoration:"none"}} id="llll" to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
           <Link style={{textDecoration:"none"}} id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui">T & P Coordinators</div>
        <div id="offf">
         <div id="off1"></div>
         <Link id="lola" style={{textDecoration:"none"}} to={`/AddCoordinators/${Id}`}><div id="off2">Add More +</div></Link>
         </div>

         <div> 
                <table id="tabu">
                    <thead className="tt" id="tabuh">
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Semester</th>
                        <th>Contact</th>
                        <th>Email</th>
                        
                    </thead>
                    {
                        tp && tp.map(cl =>(
                            <tr>
                               <td>{cl.name}</td>
                               <td>{cl.branch}</td>
                               <td>{cl.semester}</td>
                               <td>{cl.contact}</td>
                              <td>{cl.email}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
     </div>
   )
}
export default AdminCoordinator;