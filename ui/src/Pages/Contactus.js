import React from "react";
import {  useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import '../CSS/Contactus.css'; // Ensure you have the corresponding CSS file

function Contactus() {
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
      
      <main id="contact-main">
        <div id="contact-title"><center>Contact Us</center></div>

        <div id="contact-table-wrapper">
          <table id="contact-info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Er. Navdeepak Sandhu</td>
                <td>Deputy Director (CR&A)</td>
                <td>9478098040</td>
                <td>navdeepak.sandhu@ptu.ac.in</td>
              </tr>
              <tr>
                <td>Dr. Rajpreet Kaur</td>
                <td>Coordinator (CT&P)</td>
                <td>9465884865</td>
                <td>dr.rajpreet@ptu.ac.in</td>
              </tr>
              <tr>
                <td>Dr. Rakesh Goyal</td>
                <td>Coordinator (CT&P)</td>
                <td>9465884826</td>
                <td>dr.rakeshgoyal@ptu.ac.in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Contactus;
