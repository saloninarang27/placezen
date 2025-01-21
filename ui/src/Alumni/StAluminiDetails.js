import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import './StAlumniDetails.css'; // Ensure you have the corresponding CSS file
import boy from "../Pics/boy.jpg";

function StAlumniDetail() {
  const { Id, Idd } = useParams();
  const [student, setStudent] = useState(null);
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/alumini/asl/${Id}`);
        const response2 = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/alumini/asls/${Id}`);
        
        if (!response.ok || !response2.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const data2 = await response2.json();
        
        setStudent(data);
        setAlumni(data2);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [Id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarLinks = [
    { path: `/StudentProfile/${Idd}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Idd}`, label: 'Profile' },
    { path: `/StuPending/${Idd}`, label: 'Pending' },
    { path: '/', label: 'Logout' }
  ];

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!student || !alumni) {
    return <div className="no-data">Data not available</div>;
  }

  return (
    <div>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
    
      <main className="mm">
        <div className="profile-container">
          <div className="profile-card">
            <center><img className="profile-avatar" src={boy} alt="Avatar" /></center>
            <div className="profile-info">
              <div className="profile-item">
                <div className="profile-label">Full Name</div>
                <div className="profile-value">{student.name}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Designation</div>
                <div className="profile-value"><b>{alumni.job}</b></div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Batch</div>
                <div className="profile-value">{student.ssession}-{student.ssession + 4}</div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="contact-info">
              <span className="contact-title"><b>Contact Details</b></span>
              <div className="profile-item">
                <div className="profile-label">Linkedin</div>
                <div className="profile-value">{student.linkedin}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Email</div>
                <div className="profile-value">{student.email}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Portfolio</div>
                <div className="profile-value">{student.portfolio}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Mobile</div>
                <div className="profile-value">{student.mobile}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StAlumniDetail;
