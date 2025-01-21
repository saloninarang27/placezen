import React from "react";
import { useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import '../CSS/Recuriter.css'; // Ensure you have the corresponding CSS file
import top from "../Pics/top.jpg";

function Recuriter() {
  let { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
    { path: '/', label: 'Logout' }
  ];

  return (
    <div>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      
      <main id="main-content">
        <div id="page-title">Top Recruiters</div>

        <div id="image-container">
          <img id="recruiter-image" src={top} alt="Top Recruiters" />
        </div>
      </main>
    </div>
  );
}

export default Recuriter;
