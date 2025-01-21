import React, { useState ,useEffect} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
function SignUpRequest(){
  let {Id} = useParams();

  let[requrets,setRequests]=useState("");
  let[status,setStatus]=useState(1);
  const navigate = useNavigate();

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

   const next = async (request)=>{
    const formdata = new FormData();
    formdata.append('roll',request.roll)
    formdata.append('name',request.name)
    formdata.append('dob',request.dob)
    formdata.append('mobile',request.mobile)
    formdata.append('gender',request.gender)
    formdata.append('email',request.email)
    formdata.append('linkedin',request.linkedin)
    formdata.append('github',request.github)
    formdata.append('cgpa',request.cgpa)
    formdata.append('skills',request.skills)
    formdata.append('backlog',request.backlog)
    formdata.append('interest',request.interest)
    formdata.append('portfolio',request.portfolio)
    formdata.append('experience',request.experience)
    formdata.append('imageName',request.imageName)
    formdata.append('imageType',request.imageType)
    formdata.append('imagePath',request.imagePath)
    formdata.append('password',request.password)
    formdata.append('semester',request.semester)
    formdata.append('branch',request.branch)
    formdata.append('s',request.ssession)

    fetch('http://localhost:8050/student/add', {
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

      const response= await fetch(`http://localhost:8050/signApprov/delete/${request.id}`)
      .then(response => response.text())
      .then(data => {
        console.log('Successfully Deleted also:', data);
        status++;
        setStatus(status);
      })
      .catch(error => {
        console.error('Error during Deletion:', error);
      }); 
  
  }

  const delet = async (request)=>{

    const response= await fetch(`http://localhost:8050/signApprov/delete/${request.id}`)
      .then(response => response.text())
      .then(data => {
        console.log('Successfully Deleted also:', data);
        status++;
        setStatus(status);
      })
      .catch(error => {
        console.error('Error during Deletion:', error);
      }); 



  }
   const [sidebarOpen, setSidebarOpen] = useState(false);
      const sidebarLinks = [
        { path: `/AdminProfile/${Id}`, label: "Dashboard" },
        // { path: `/SignUpRequest/${Id}`, label: "New Students" },
        { path: `/removeStudents/${Id}`, label: "Delete students" },
        { path: `/AddAdmins/${Id}`, label: "Add Admins" },
        // {path:'/logout'}
      ];
  return(
    <div>
      <div id="bcd"  style={{marginLeft:"20%"}}>I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

     
            <div id="material-title" style={{marginTop:"10px",marginLeft:"190px"}}>SignUp Request</div>
       

       <div id="doremon" >
        { requrets && requrets.map(request =>(
           <div id="thisthat">
            <h1 id="boxspan1">{request.name}</h1>
            <h3>Roll No : {request.roll}</h3>
            <h3>branch: {request.branch}</h3>
            <h3>Semester:{request.semester}th</h3>
            
            <button onClick={() => next(request)}style={{ width:'20%', backgroundColor: 'green', color: '#fff', marginLeft:'10%',marginRight: '18%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Approve</button>
            <button onClick={() => delet(request)}style={{ width:'20%', backgroundColor: 'green', color: '#fff', marginRight: '1%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
            
            {/* <button onClick={() => next(request)}style={{ width: '80px', color:"white" ,backgroundColor:"green" }}>Add</button></span> */}
            {/* <span><button onClick={() => delet(request)}style={{ width: '80px', color:"crimson" }}>Decline</button></span> */}



           </div>
        ))
        }
       </div>
    </div>
  )
}
export default SignUpRequest;