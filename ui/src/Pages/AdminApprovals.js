import React, { useState ,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/AdminApporvals.css";
import Sidebar from "../sidebar/Sidebar";
function AdminApprovals(){
  let {Id} = useParams();
  let[requests,setRequests]=useState("");
  let[status,setStatus]=useState(1);
  // setStatus(1);
  // const navigate = useNavigate();
  useEffect( ()=>{
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/signApprov/all`);
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

  //  const next = async (request)=>{
  //   const formdata = new FormData();
  //   formdata.append('Company',request.companyName)
  //   formdata.append('Role',request.role)
  //   formdata.append('Apply',request.link)
  //   fetch('http://localhost:8050/OnlineApproval/adds', {
  //     method:'POST',
  //     body: formdata,
    
  //   })
  //     .then(response => response.text())
  //     .then(data => {
  //       console.log('SignUp successful:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error during SignUp:', error);
  //     });
  // }

  const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarLinks = [
      { path: `/AdminProfile/${Id}`, label: "Dashboard" },
      { path: `/SignUpRequest/${Id}`, label: "New Students" },
      { path: `/removeStudents/${Id}`, label: "Delete students" },
      { path: `/AddAdmins/${Id}`, label: "Add Admins" },
    ];
  return(
    <div>
     
      <div id="bcd">I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

            <div id="iui">New Students Requests</div>
       <div id="doremon" className="dor">
        { requests && requests.map(request =>(<Link id="lalu" to={`/ApproveHiringDetails/${request.sid}/${request.jobId}`}>
           <div id="thisthat">
            <h3>Company : {request.companyName}</h3>
            <h3>View details</h3>
           </div></Link>
        ))
        }
       </div>
    </div>
  )
}
export default AdminApprovals;