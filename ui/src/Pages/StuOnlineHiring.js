import React, { useEffect, useState } from "react";
import "../CSS/StuOnlineHiring.css";
import { useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";

function StuOnlineHiring() {
  const [hiring, setHiring] = useState([]);
  const { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/AddOn/alll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHiring(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
    { path: `/StuPending/${Id}`, label: 'Pending' },
    { path: '/', label: 'Logout' }
  ];

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <main className={`stu-online-hiring-content ${sidebarOpen ? 'stu-online-hiring-with-sidebar' : ''}`}>
        <div className="stu-online-hiring-main-content">
          <h1 className="stu-online-hiring-title">Online Hirings</h1>

          {loading ? (
            <div className="stu-online-hiring-loader"></div>
          ) : (
            <div className="stu-online-hiring-job-list">
              {hiring.length > 0 ? (
                hiring.map((hire) => (
                  <div className="stu-online-hiring-job-card" key={hire.id}>
                    <h2>{hire.companyName}</h2>
                    <h4>ROLE: {hire.role}</h4>
                    <h4>
                      <a href={`${hire.link}`} target="_blank" rel="noopener noreferrer">Apply Here</a>
                    </h4>
                  </div>
                ))
              ) : (
                <p>No job listings available.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StuOnlineHiring;
