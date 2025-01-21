import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
function RemoveStudents()
{
    let{Id}=useParams();
    let[students,setStudents]=useState();
    let[status,setStatus]=useState(0)
    var i=1;

    useEffect( ()=>{
        const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/student/all`);
              if (!response.ok) {
                throw new Error('Network response was not okk');
              }
              const data = await response.json();
              console.log(data);
              setStudents(data)
              
              
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


   const remove= async(id)=>
    {
        const response= await fetch(`http://localhost:5000/student/delete/${id}`)
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
            // { path: `/removeStudents/${Id}`, label: "Delete students" },
            
            { path: `/AddAdmins/${Id}`, label: "Add Admins" },
            {path:'/',label:"logout"}
          ];
    return(
        <div>
             <div id="bcd" style={{position:"fixed",width:"100vw"}}> I.K. Gujral Punjab Technical University</div>
             <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <br></br><br></br><br></br>
            <div id="material-title">Manage Students</div>


      <div>
                
                <table id="tabu">
                    <thead className="tt" id="tabuh">
                        <th>Sl No.</th>
                        <th>Student Name</th>
                        <th>Session</th>
                        <th>Roll Number</th>
                        <th>Branch</th>
                        <th></th>
                        {/* <th>Date</th> */}
                        
                    </thead>
                    {   
                        students && students.map(student =>(
                            <tr>
                               <td>{i++}</td>
                               <td>{student.name}</td>
                               <td>{student.ssession} - {student.ssession+4}</td>
                               <td>{student.roll}</td>
                               <td>{student.branch}</td>
                               {/* <td>{convertDate(student.date)}</td> */}
                              <td><button onClick={()=>remove(student.id)} style={{width:'100%', backgroundColor: 'green', color: '#fff', marginRight: '8%', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button></td> 
                            </tr>
                            
                        ))
                    }
                </table>
            </div>


        </div>
    )
}
export default RemoveStudents;