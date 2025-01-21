import React, { useEffect, useState } from 'react'
import Header from '../sidebar/Header'
import Sidebar from '../sidebar/Sidebar'
import { useParams } from 'react-router-dom';
import "../CSS/Ongoing.css"


function Ongoing() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    let { Id, jobId } = useParams();
    let [hiring, setHiring] = useState("");
   
    
    const [rounds, setRounds] = useState([]);
  
    const sidebarLinks = [
        { path: `/StudentProfile/${Id}`, label: "Dashboard" },
        { path: `/StuProfilePage/${Id}`, label: "Profile" },
        { path: `/StuPending/${Id}`, label: "Pending" },
        { path: "/", label: "Logout" },
      ];
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
    

      useEffect(() => {
        const fetchRoundsData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/round/findAllByJobId/${jobId}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            setRounds(data);
          } catch (error) {
            console.error("Error fetching rounds data: ", error.message);
          }
        };
        fetchRoundsData();
      }, [jobId]);
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
        <tr id="tabuh">
          <td>{hiring.companyName}</td>
          <td>{hiring.role}</td>
          <td>{hiring.ctc / 100000} LPA</td>
          <td>{hiring.startSession} - {hiring.startSession + 4}</td>
          <td>{hiring.cgpa}</td>
          <td>{hiring.endDate}</td>
        </tr>
      </table>

      <br></br><br></br>
      
      <h3  style={{marginLeft: "25%"}}> In Progress</h3>

  <div className="cnt">
  {rounds.length > 0 ? (
    <div className="rounds-container">
      {rounds
        .slice()
        .reverse()
        .map((round, index) => (
          <div className="round-card" key={index}>
            <h3>
              Round {round.roundNum}: {round.roundName}
            </h3>
            <p>
              <strong>Date:</strong> {round.date}
            </p>
            <p className="round-message">{round.message}</p>
            <h4>Selected Students:</h4>
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody>
                {round.stdDetails.map((student, idx) => (
                  <tr key={idx}>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{student.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  ) : (
    <p>No rounds found for this job.</p>
  )}
</div>



</div>
  
  )
}

export default Ongoing