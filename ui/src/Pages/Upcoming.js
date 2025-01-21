import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Upcoming() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let { Id, jobId } = useParams();
  let [hiring, setHiring] = useState("");
  let [students, setStudents] = useState([]);
  

  // Fetch Hiring Data
  useEffect(() => {
    const fetchHiringData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Hiring/fetch/${jobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setHiring(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };
    fetchHiringData();
  }, [jobId]);

  // Fetch Students Data
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Applied/search/${jobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };
    fetchStudentsData();
  }, [jobId]);

  // Update Hiring Status
  const updateHiringStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/status/updateStatus/${jobId}`, {
        method: 'PUT', // Adjust based on your API's method
       
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      const data = await response.json();
      console.log("Hiring status updated: ", data);
      // alert("Hiring status updated successfully!");
    } catch (error) {
      console.error("Error updating hiring status: ", error.message);
      
    }
  };

  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statics" },
    { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

      <table id="tabu">
        <thead className="tt" id="tabuh">
          <tr>
            <th>Company Name</th>
            <th>Role</th>
            <th>CTC</th>
            <th>Batch</th>
            <th>CGPA</th>
            <th>Last Date</th>
          </tr>
        </thead>
        <tbody>
          <tr id="tabuh">
            <td>{hiring.companyName}</td>
            <td>{hiring.role}</td>
            <td>{hiring.ctc / 100000} LPA</td>
            <td>{hiring.startSession} - {hiring.startSession + 4}</td>
            <td>{hiring.cgpa}</td>
            <td>
              {hiring.endDate ? hiring.endDate.split('-').reverse().join('-') : 'N/A'}
            </td>
          </tr>
        </tbody>
      </table>

   

      <h2 style={{ marginLeft: "22%" }}>
        <center>Total Students Applied : {students.length}</center>
      </h2>

      <table id="studentTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Branch</th>
            <th>Application Date</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>{student.branch}</td>
              <td>{new Date(student.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <ReactHTMLTableToExcel
            
            id="test-table-xls-button"
            className="ccc"
            table="studentTable"
            filename="students"
            sheet="students_sheet"
            buttonText="Download as Excel"
             /> 
                <button 
        onClick={updateHiringStatus} 
        style={{
          marginLeft: "52%",
          padding: "10px 20px",
          backgroundColor: "DarkBlue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Start Hiring Process
      </button>
    </div>
  );
}

export default Upcoming;
