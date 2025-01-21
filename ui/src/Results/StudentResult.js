import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "./studentResult.css"; // Ensure you have the corresponding CSS file
import boy from "../Pics/boy.jpg";
import girl from "../Pics/girl.jpg";

function StudentResult() {
  const { Id } = useParams();
  console.log(Id)
  const [company, setCompany] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(2025);
  const [lpa, setLpa] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // setLpa(0);
  const fetchStudents = async (year, lpa) => {
    setLoading(true);
    try {
      const response1 = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/result/allC2`);
      const response2 = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/student/std/${year}/${lpa}`);

      if (!response1.ok || !response2.ok) {
        throw new Error('Network response was not ok');
      }

      const data1 = await response1.json();
      const data2 = await response2.json();

      setCompany(data1);
      console.log(data1)
      setStudents(data2);
    } catch (error) {
      console.error('Error fetching data: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(year, lpa);
  }, [year, lpa]);

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    ...company.map(c => ({
      
      path: `/CompStudResult/${c.companyName}/${c.id}/${Id}`,
      label: `${c.companyName}`
    })),
    { path: '/', label: 'Logout' }
  ];
  

  return (
    <div >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

      <main className={`student-main-content ${sidebarOpen ? 'student-main-content-with-sidebar' : ''}`}>
        <div className="student-search-container">
          <input 
            type="number" 
            placeholder="Enter year" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="student-search-input"
          />
      
          <button onClick={() => fetchStudents(year, lpa)} className="student-search-button">Search</button>
        </div>

        <div className="student-result-list">
          {loading ? (
            <div className="student-loader"></div>
          ) : (
            students.length > 0 ? (
              students.map(res => (
                <div className="student-card" key={res.id}>
                  <h2 className="student-company-heading">{res.compName}</h2>
                  <img src={res.gender === 'Female' ? girl : boy} alt="Student" className="student-image"/>
                  <h3 className="student-name">{res.studName}</h3>
                  <h3 className="student-branch">{res.branch}</h3>
                  <p className="student-session">{res.session} - {res.session + 4}</p>
                  <p className="student-ctc">{res.ctc / 100000} LPA</p>
                  <p className="student-role">{res.role}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentResult;
