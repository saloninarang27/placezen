import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS/HiringResponseSheet.css";
import Sidebar from "../sidebar/Sidebar";

function HiringResponseSheet() {
  let { Id, jobId } = useParams();
  let [hiring, setHiring] = useState("");
  let [students, setStudents] = useState([]);
  let [formVisible, setFormVisible] = useState(false);
  let [roundNumber, setRoundNumber] = useState("");
  let [roundName, setRoundName] = useState("");
  let [message, setMessage] = useState("");
  let [rollNumbers, setRollNumbers] = useState([""]);
  
  const [rounds, setRounds] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statics" },
    { path: `/Alumnii/${Id}`, label: "Alumni" },
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

  function handleAddRollNumber() {
    setRollNumbers([...rollNumbers, ""]);
  }

  function handleRollNumberChange(index, value) {
    const newRollNumbers = [...rollNumbers];
    newRollNumbers[index] = value;
    setRollNumbers(newRollNumbers);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // Get current date in yyyy-mm-dd format
    const currentDate = new Date().toISOString().split('T')[0];

    const formData = {
      rndNumber: roundNumber,
      roundName: roundName,
      jobId: jobId,
      rollNumList: rollNumbers.join(","),
      description: message,
      date: currentDate, // Use current date in yyyy-mm-dd format
    };

    fetch("http://localhost:5000/round/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        alert("Updated Successfully")
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        setFormVisible(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  }

  function closeForm() {
    setFormVisible(false);
  }

  return (
    <div>
      <div id="bcd">I.K. Gujral Punjab Technical University</div>
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
          {hiring && <td>{hiring.endDate.split('-').reverse().join('-')}</td>}
        </tr>
      </table>

      <h2 style={{ marginLeft: "22%" }}>
        <center>Total Students Applied : {students.length}</center>
      </h2>
      <button className="button-right" onClick={() => setFormVisible(true)}>
        Update Status
      </button>
<br></br><br></br>
<br></br>
<div className="cnt" >
  {rounds.length > 0 ? (
    <div className="rounds-container">
      {rounds
        .slice()
        .reverse()
        .map((round, index) => (
          <div className="round-card" key={index}>
            <h3>
             {round.roundNum}: {round.roundName}
            </h3>
            <p>
              <strong>Date:</strong> <p><strong>Date:</strong> {round.date.split('-').reverse().join('-')}</p>

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



      {formVisible && (
        <div className="form-container">
          <button onClick={closeForm}>❌</button>
          <h2>Update Status</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Round Number:</label>
              <input
                type="text"
                value={roundNumber}
                onChange={(e) => setRoundNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Round Name:</label>
              <input
                type="text"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Roll Numbers:</label>
              {rollNumbers && rollNumbers.map((roll, index) => (
                <input
                  key={index}
                  type="text"
                  value={roll}
                  onChange={(e) => handleRollNumberChange(index, e.target.value)}
                  required
                  placeholder={`Roll Number ${index + 1}`}
                />
              ))}
              <button type="button" onClick={handleAddRollNumber}>
                Add Roll Number
              </button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HiringResponseSheet;
