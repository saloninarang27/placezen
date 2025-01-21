// import React from "react";
// import { Link, useParams } from "react-router-dom";
// function Alumnii()
// { let{Id}=useParams();


//     return (
//     <div>
//       <div id="bcd"> I.K. Gujral Punjab Technical University</div>
//        <div  id="mySidebar">
//         <span className="s2" id="sus">Welcome</span>
//           {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
//           <Link id="llll"  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
//           <Link id="llll" to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
//            <Link id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
//       </div>
//       <div id="iui">Our Alumnii</div>




//     </div>
//     )
// }
// export default Alumnii;
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
function Alumnii()
{ 
  let[students,setStudetns]=useState("");
  let{Id}=useParams();
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
          setStudetns(data);
        } 
        catch (error) {
          console.error('Error fetching data: ', error.message);
        }
  }  ;
  if(1)
  {
      fetchData();
  }  
},[])
    return (
    <div>
       <div id="bcd"> I.K. Gujral Punjab Technical University</div>
       <div  id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll" style={{textDecoration:"none"}}  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px', textDecoration:"none"}}>Dashboard</span></Link>
          <Link id="llll"  style={{textDecoration:"none"}} to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' ,textDecoration:"none"}}>Profile</span></Link>
           <Link id="llll" style={{textDecoration:"none"}}  to="/"> <span  className="s1" style={{ fontSize: '20px' ,textDecoration:"none"}}>Logout</span></Link>
    </div>
     
      
      <div id="iui">Our Alumnii</div>
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
                    <br></br>
                   
                    {   
    students && students.map(student => {
        if (student.semester >=8) {
            return (
                <tr key={student.roll}>
                    <td>{i++}</td>
                    <td>{student.name}</td>
                    <td>{student.ssession}-{student.ssession+4}</td>
                    <td>{student.roll}</td>
                    <td>{student.branch}</td>
                    {/* <td><input placeholder={`${student.semester}th Semester CGPA`} /></td> */}
                    {/* <td>{convertDate(student.date)}</td> */}
                    <td>
                        <Link to={`/AluminiDetail/${student.roll}/${Id}`}><button style={{ width:'100%', backgroundColor: 'green', color: '#fff', marginRight: '8%', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Profile</button></Link>
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
export default Alumnii;