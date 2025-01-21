import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./AddResult.css";
import Sidebar from "../sidebar/Sidebar";

function AddResult() {
  const { Id } = useParams();
  const [hiring, setHiring] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [CName, setCName] = useState();
  const [CId, setCId] = useState();
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Hiring/get");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // const data = await response.json();

// Filter the data to include only those with status "In Progress"
const filteredData = data.filter(job => job.status === "Upcoming" ||job.status === "In Progress" );

console.log(filteredData);
setHiring(filteredData);
      
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
    fetchData();
  }, []);

  function input1(event) {
    setSelectedOption(event.target.value);
    const [companyId, companyName] = event.target.value.split(",");
    setCId(companyId);
    setCName(companyName);
  }

  function addRow() {
    if (CId && CName) {
      setStudentData([...studentData, { jid: CId, cname: CName, sid: "", role: "", ctc: "" }]);
    } else {
      alert("Please select a company before adding results.");
    }
  }
  

  function handleInputChange(index, fieldName, value) {
    const newData = [...studentData];
    newData[index][fieldName] = value;
    setStudentData(newData);

    if (CId !== undefined && CName !== undefined && newData[index].sid && newData[index].role && newData[index].ctc) {
      console.log(CId + " " + CName + " " + newData[index].sid + " " + newData[index].role + " " + newData[index].ctc);
    } 
  }

  function saveData() {
    fetch('http://localhost:5000/result/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => response.text())
    .then(data => {
      console.log(CId)
      updateJobStatus(CId);
      console.log('Added Successfully:', data);
      alert("Result Successfully Added !!!")
      navigate(`/Adminresult/${Id}`)
    })
    .catch(error => {
      console.error('Error during Adding:', error);
    });
  }

  const updateJobStatus = async (jobId) => {
    let currStatus="Completed"
    const url = `http://localhost:5000/status/update/${jobId}?currStatus=${currStatus}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const message = await response.text();
        // alert(message); // Display success message
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`); // Display error message
      }
    } catch (error) {
      alert("An error occurred while updating the status. Please try again.");
      console.error("Error:", error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statics" },
    { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];

  return (
    <div>
      <div id="bcd">I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
     
      <div id="iui">Add Results</div>

      <div id="niu">
        <div>
          <select style={{color:"black"}} value={selectedOption} onChange={input1}>
            <option style={{color:"black"}} value="">select</option>
            {hiring &&
              hiring.map((company) => (
                <option  key={company.job_id} value={`${company.job_id},${company.company_name}`}>
                  {company.company_name}
                </option>
              ))}
          </select>
          <br />
          
          {studentData.map((student, index) => (
            <div key={index}>
              <input id="oi" placeholder="Roll Number" value={student.sid} onChange={(e) => handleInputChange(index, "sid", e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input placeholder="Role" value={student.role} onChange={(e) => handleInputChange(index, "role", e.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
              <input placeholder="CTC" value={student.ctc} onChange={(e) => handleInputChange(index, "ctc", e.target.value)} />
              <br /><br />
            </div>
          ))}
          
          <div>
            <button onClick={addRow} style={{ backgroundColor: 'green', color: '#fff', marginLeft: '30%', marginRight: '10%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add More Results</button>
            <button onClick={saveData} style={{ width: '20%', backgroundColor: 'green', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddResult;
