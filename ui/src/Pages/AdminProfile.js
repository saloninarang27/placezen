


import React, { useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import Header from "../sidebar/Header"
import Sidebar from "../sidebar/Sidebar";
import "../CSS/AdminProfile.css"; // Ensure this CSS file is applied to both components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChartSimple, faFile,  faUsers, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


function AdminProfile() {
  let { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { path: `/AdminProfilePage/${Id}`, label: 'Profile' },
    { path: `/AdminApprovals/${Id}`, label: 'Approvals' },
    { path: `/Alumni/${Id}`, label: 'Alumni' },
    { path: `/Adminresult/${Id}`, label: 'Results' },
    { path: `/AdminCoordinators/${Id}`, label: 'T & P Coordinators' },
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
        <Link to={`/OffHiring/${Id}`}><div className="info-box"><h2 className="info-title">Campus Drives</h2><FontAwesomeIcon className="info-icon" icon={faGraduationCap} /></div></Link>
        <Link to={`/OnlineHiring/${Id}`}><div className="info-box"><h2 className="info-title">Online Hiring</h2><FontAwesomeIcon className="info-icon" icon={faChartSimple} /></div></Link>
        <Link to={`/Admin-Preparation-Material/${Id}`}><div className="info-box"><h2 className="info-title">Preparation Material</h2><FontAwesomeIcon className="info-icon" icon={faFile} /></div></Link>
        <Link to={`/allStudents/${Id}`}><div className="info-box"><h2 className="info-title">Manage Students</h2><FontAwesomeIcon className="info-icon" icon={faUsers} /></div></Link>
        <Link to={`/ResultStats/${Id}`}><div className="info-box"><h2 className="info-title">Placement Statistics</h2><FontAwesomeIcon className="info-icon" icon={faChartSimple} /></div></Link>
        <Link to={`/Events/${Id}`}><div className="info-box"><h2 className="info-title">Upcoming Sessions</h2><FontAwesomeIcon className="info-icon" icon={faCalendarDays} /></div></Link>
      </main>
    </div>
  );
}

export default AdminProfile;
