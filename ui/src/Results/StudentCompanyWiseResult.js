import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./StudCompWiseResult.css";
import boy from "../Pics/boy.jpg";
import girl from "../Pics/girl.jpg";
import Header from "../sidebar/Header";
import Sidebar from "../sidebar/Sidebar";

function StudentCompWiseResult() {
  let { compName,compId, Id } = useParams();
  const [result, setStudents] = useState([]);
  const [company, setCompany] = useState([]); // Initialize as null to handle undefined state
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/result/allC2");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company data: ', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        const response = await fetch(`http://localhost:5000/student/details/${compId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
    fetchData();
  }, [compId]);

  // Create the sidebar links only if company data is available
  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    ...company.map(c => ({
      
      path: `/CompStudResult/${c.companyName}/${c.id}/${Id}`,
      label: `${c.companyName}`
    })),
    { path: '/', label: 'Logout' }
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
  <div id="details-container">
    <h2>{compName}</h2>
    {result && result.map(res => (
      <div className="details-card-container" key={res.id}>
        <h2 className="details-card-heading">{res.compName}</h2>
        {/* <p className="details-card-congrats">Congratulates</p> */}
        <img 
          src={res.gender === 'Female' ? girl : boy} 
          className="details-card-image"
          alt="Student" 
        />
        <h3 className="details-card-student-name">{res.studName}</h3>
        <h3 className="details-card-branch">{res.branch}</h3>
        <p className="details-card-session">{res.session} - {res.session + 4}</p>
        <p className="details-card-ctc">{res.ctc / 100000} LPA</p>
        <p className="details-card-role">{res.role}</p>
      </div>
    ))}
  </div>
</div>

      )}
    </div>
  );
}

export default StudentCompWiseResult;
