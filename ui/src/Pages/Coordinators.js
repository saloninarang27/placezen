import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "./Coordinator.css"; // Ensure you have the corresponding CSS file

function AdminCoordinator() {
  const [tp, setTp] = useState([]);
  const { Id } = useParams();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/TP/total`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTp(data);
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

      <div className={`admin-content ${sidebarOpen ? 'admin-content-with-sidebar' : ''}`}>
        <div id="admin-title">Coordinators</div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead className="admin-table-head">
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Contact</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {tp.map((cl, index) => (
                  <tr key={index}>
                    <td>{cl.name}</td>
                    <td>{cl.branch}</td>
                    <td>{cl.semester}</td>
                    <td>{cl.contact}</td>
                    <td>{cl.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCoordinator;
