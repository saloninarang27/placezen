import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "./EventAdmin.css"; // Ensure you have the corresponding CSS file

function EventStudent() {
  let { Id } = useParams();
  let [eventt, setEventt] = useState([]);
  let [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/session/get`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setEventt(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
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
      
      <div className="event-main-content">
        <div id="event-title" style={{color:"black"}}>Upcoming Events</div>
        
        {loading ? ( 
          <div className="event-loader"></div> 
        ) : (
          <div id="event-list">
            {eventt && eventt.map((ee, index) => (
              <div className="event-card" key={index}>
                <h2>{ee.sname}</h2>
                <h4><span className="event-question">Location:</span> {ee.location}</h4>
                <h4><span className="event-question">Speaker:</span> {ee.speaker}</h4>
                <h4><span className="event-question">Date:</span> {ee.date}</h4>
                <h4><span className="event-question">Timings:</span> {ee.timings}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventStudent;
