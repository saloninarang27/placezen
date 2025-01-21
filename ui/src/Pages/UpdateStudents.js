import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function UpdateStudents(){
  let {Id}=useParams();
  let[students,setStudents]=useState();
  let[status,setStatus]=useState(0)
  var i=1;
  useEffect( ()=>{
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:8050/student/all`);
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

   const update = async(roll,cgpa)=>{
    console.log(roll,cgpa)

    const response= await fetch(`http://localhost:8050/student/update/${roll}/${cgpa}`)
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
      <div id="iui">Update Students</div>

      <div>
                
                <table id="tabu">
                    <thead className="tt" id="tabuh">
                        <th>Sl No.</th>
                        <th>Student Name</th>
                        <th>Semester</th>
                        <th>Roll Number</th>
                        <th>Branch</th>
                        <th>Current Semester CGPA</th>
                        <th></th>
                        {/* <th>Date</th> */}
                        
                    </thead>
                    {   
    students && students.map(student => {
        if (student.semester !== 9) {
            return (
                <tr key={student.roll}>
                    <td>{i++}</td>
                    <td>{student.name}</td>
                    <td>{student.semester}</td>
                    <td>{student.roll}</td>
                    <td>{student.branch}</td>
                    <td><input placeholder={`${student.semester}th Semester CGPA`} /></td>
                    {/* <td>{convertDate(student.date)}</td> */}
                    <td>
                        <button onClick={() => update(student.roll, student.cgpa)} style={{ width:'100%', backgroundColor: 'green', color: '#fff', marginRight: '8%', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
                    </td> 
                </tr>
            );
        } else {
            return null; // Skip rendering for students with semester 9
        }
    })
}

                </table>
            </div>

    </div>
  )
}
export default UpdateStudents