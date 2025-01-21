import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "../CSS/StuOnlineHiring.css";

function OnlineHiring() {
  const [hiring, setHiring] = useState([]);
  const { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/AddOn/alll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHiring(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: 'Dashboard' },
    { path: `/AdminProfilePage/${Id}`, label: 'Profile' },
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
      {/* <main className="content">
        
        <div className="main-content">
        
          <div className="add-more">
            <Link className="add-link" to={`/AddOnlineHiring/${Id}`}>Add More +</Link>
          </div>
          <div className="job-list">
            {hiring.length > 0 ? (
              hiring.map(hire => (
                <div className="job-card" key={hire.id}>
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
        </div>
      </main> */}
      <main id="main-content">
  <div id="content-container">
    <div id="add-more-section">
      <Link id="add-link" to={`/AddOnlineHiring/${Id}`}>Add More +</Link>
    </div>
    <div id="job-list-section">
      {hiring.length > 0 ? (
        hiring.map(hire => (
          <div id={`job-card-${hire.id}`} key={hire.id}>
            <h2 id={`company-name-${hire.id}`}>{hire.companyName}</h2>
            <h4 id={`role-${hire.id}`}>ROLE: {hire.role}</h4>
            <h4 id={`apply-link-${hire.id}`}>
              <a href={`${hire.link}`} target="_blank" rel="noopener noreferrer">Apply Here</a>
            </h4>
          </div>
        ))
      ) : (
        <p id="no-job-listings">No job listings available.</p>
      )}
    </div>
  </div>
</main>

    </div>
  );
}

export default OnlineHiring;
