import React, { useEffect, useState } from "react";
import "../Session/EventAdmin.css";
import { Link, useParams } from "react-router-dom";
import Header from "../sidebar/Header";
import Sidebar from "../sidebar/Sidebar";
function EventAdmin(){
  let{Id}=useParams();
  let[eventt,seteventt]=useState("");
  useEffect( ()=>{
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/session/get`);
          if (!response.ok) {
            throw new Error('Network response was not okk');
          }
          const data = await response.json();
          console.log(data);
          seteventt(data);
          console.log(eventt); 
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
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statics" },
    { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];

  return(
    <div>
         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <div id="iui" style={{marginLeft:"20%",color:"red",fontSize:"bolder"}}>Upcoming Events</div>
        <div id="offf">
        <div id="off1"></div>
        <Link style={{textDecoration:"none"}} to={`/addEvents/${Id}`}><div id="off2">Add More +</div></Link>
       </div>

       <div id="event-container">
  {eventt && eventt.map(ee => (
    <div className="event-card-container" key={ee.id}>
      <h2 className="event-card-title" style={{color:"white"}}>{ee.sname}</h2>
      <h4 className="event-card-detail">Location: {ee.location}</h4>
      <h4 className="event-card-detail">Speaker: {ee.speaker}</h4>
      <h4 className="event-card-detail">Date: {ee.date}</h4>
      <h4 className="event-card-detail">Timings: {ee.timings}</h4>
      {/* <h4 className="event-card-detail">Description: {ee.description}</h4> */}
    </div>
  ))}
</div>

      
    </div>
  )
}
export default EventAdmin;