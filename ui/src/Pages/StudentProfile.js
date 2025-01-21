// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import "../CSS/StudentProfile.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGraduationCap, faChartSimple, faFile, faFilePen, faUsers, faCalendarDays, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// function StudentProfile() {
//   let { Id } = useParams();
//   const [profile, setProfile] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8050/student/getStudent/${Id}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         console.error('Error fetching data: ', error.message);
//       }
//     };

//     if (Id) {
//       fetchData();
//     }
//   }, [Id]);

//   if (profile === null) {
//     return (<div><h1><center>Page not found !!!!</center></h1></div>);
//   }

//   return (
//     <div>
//       <header className="header">
//         <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//         I.K. Gujral Punjab Technical University
//       </header>
//       <div className="student-profile-container">
//         <aside className={`sidebar ${sidebarOpen && window.innerWidth < 769 ? 'show' : ''}`}>
//           <button className="close-button" onClick={() => setSidebarOpen(false)}>
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//           <span className="dashboard-title">Student Dashboard</span>
//           <Link className="sidebar-link" to={`/StuProfilePage/${Id}`}><span className="sidebar-item">Profile</span></Link>
//           <Link className="sidebar-link" to={`/StResume/${Id}`}><span className="sidebar-item">Resume</span></Link>
//           <Link className="sidebar-link" to={`/StAlumni/${Id}`}><span className="sidebar-item">Alumni</span></Link>
//           <Link className="sidebar-link" to={`/StuApplied/${Id}`}><span className="sidebar-item">Applied</span></Link>
//           <Link className="sidebar-link" to={`/StuPending/${Id}`}><span className="sidebar-item">Pending</span></Link>
//           <Link className="sidebar-link" to={`/Coordinators/${Id}`}><span className="sidebar-item">T & P Coordinators</span></Link>
//           <Link className="sidebar-link" to={`/Recuriter/${Id}`}><span className="sidebar-item">Top Recruiters</span></Link>
//           <Link className="sidebar-link" to={`/Contactus/${Id}`}><span className="sidebar-item">Contact Us</span></Link>
//           <Link className="sidebar-link" to="/"><span className="sidebar-item">Logout</span></Link>
//         </aside>
//         <main className="content">
//           <Link to={`/CampusDrive/${Id}`}><div className="info-box"><h2 className="info-title">Campus Drives</h2><FontAwesomeIcon className="info-icon" icon={faGraduationCap} /></div></Link>
//           <Link to={`/OnlineHiring2/${Id}`}><div className="info-box"><h2 className="info-title">Online Hiring</h2><FontAwesomeIcon className="info-icon" icon={faChartSimple} /></div></Link>
//           <Link to={`/prepMaterial/${Id}`}><div className="info-box"><h2 className="info-title">Preparation Material</h2><FontAwesomeIcon className="info-icon" icon={faFile} /></div></Link>
//           <Link to={`/StudentResult/${Id}`}><div className="info-box"><h2 className="info-title">Placement Results</h2><FontAwesomeIcon className="info-icon" icon={faUsers} /></div></Link>
//           <Link to={`/stPostMaterial/${Id}`}><div className="info-box"><h2 className="info-title">Posts</h2><FontAwesomeIcon className="info-icon" icon={faFilePen} /></div></Link>
//           <Link to={`/EventStudent/${Id}`}><div className="info-box"><h2 className="info-title">Upcoming Sessions</h2><FontAwesomeIcon className="info-icon" icon={faCalendarDays} /></div></Link>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;


import React, { useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "../CSS/StudentProfile.css" // Ensure this CSS file is applied to both components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChartSimple, faFile, faFilePen, faUsers, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


function StudentProfile() {
  let { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
    
    { path: `/StAlumni/${Id}`, label: 'Alumni' },
    { path: `/StuApplied/${Id}`, label: 'Applied' },
    { path: `/StuPending/${Id}`, label: 'Pending' },
    { path: `/Coordinators/${Id}`, label: 'T & P Coordinators' },
    { path: `/Recuriter/${Id}`, label: 'Top Recruiters' },
    { path: `/Contactus/${Id}`, label: 'Contact Us' },
    { path: '/', label: 'Logout' },
  ];

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <main className="content">
        <Link to={`/CampusDrive/${Id}`}><div className="info-box"><h2 className="info-title">Campus Drives</h2><FontAwesomeIcon className="info-icon" icon={faGraduationCap} /></div></Link>
        <Link to={`/OnlineHiring2/${Id}`}><div className="info-box"><h2 className="info-title">Online Hiring</h2><FontAwesomeIcon className="info-icon" icon={faChartSimple} /></div></Link>
        <Link to={`/StudentResult/${Id}`}><div className="info-box"><h2 className="info-title">Placement Results</h2><FontAwesomeIcon className="info-icon" icon={faUsers} /></div></Link>
        <Link to={`/prepMaterial/${Id}`}><div className="info-box"><h2 className="info-title">Preparation Material</h2><FontAwesomeIcon className="info-icon" icon={faFile} /></div></Link>

        <Link to={`/stPostMaterial/${Id}`}><div className="info-box"><h2 className="info-title">Posts</h2><FontAwesomeIcon className="info-icon" icon={faFilePen} /></div></Link>
        <Link to={`/EventStudent/${Id}`}><div className="info-box"><h2 className="info-title">Upcoming Sessions</h2><FontAwesomeIcon className="info-icon" icon={faCalendarDays} /></div></Link>
      </main>
    </div>
  );
}

export default StudentProfile;
