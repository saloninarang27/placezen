import React, { useEffect, useState } from "react";
import "../CSS/Completedpg.css"; // Updated styles for this page
import Header from "../sidebar/Header";
import Sidebar from "../sidebar/Sidebar";
import { useParams } from "react-router-dom";
import boy from "../Pics/boy.jpg";
import girl from "../Pics/girl.jpg";

function Completedpg() {
  const { comp, Id, JobId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: "Dashboard" },
    { path: `/StuProfilePage/${Id}`, label: "Profile" },
    { path: `/StuPending/${Id}`, label: "Pending" },
    { path: "/", label: "Logout" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/result/stdIn/${JobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JobId]);

  return (
    <div >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
       <h2 style={{marginLeft:"50%" }}>{comp} Final Results</h2>
      <div className="students-container">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : students.length > 0 ? (
          students.map(res => (
            <div className="student-card" key={res.id}>
           
              {/* <div className="card-header">
                <h2 className="company-name">{res.compName}</h2>
              </div> */}
              <div className="student-details">
                <img
                  src={res.gender === "Female" ? girl : boy}
                  alt="Student"
                  className="student-photo"
                />
                <h3 className="student-name">{res.studName}</h3>
                <h4 className="student-branch">{res.branch}</h4>
                {/* <p className="student-session">{res.session} - {res.session + 4}</p> */}
                <p className="student-ctc">{res.ctc / 100000} LPA</p>
                <p className="student-role">{res.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-student-data">No student data available.</p>
        )}
      </div>
    </div>
  );
}

export default Completedpg;
