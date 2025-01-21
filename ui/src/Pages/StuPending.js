import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
// import './StuPending.css'; // Ensure you have the corresponding CSS file

function StuPending() {
  const { Id } = useParams();
  const [hiring, setHiring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/Applied/queen/${Id}`);
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
  }, [Id]);

  const next = (jobId) => {
    navigate(`/HiringDetails/${Id}/${jobId}`);
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
    { path: `/StuApplied/${Id}`, label: 'Applied' },
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
      
      <main className="main-contennt">
        <div className="page-header">Pending Forms</div>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>CTC</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
              {hiring
  .filter((hire) => {
    const today = new Date();
    const hireDate = new Date(hire.endDate);
    return hireDate >= today; // Filter by date comparison
  })
  .map((hire) => (
    <tr
      key={hire.jobId}
      onClick={() => next(hire.jobId)}
      className="clickable-row"
      style={{ cursor: "pointer" }}
    >
      <td>{hire.companyName}</td>
      <td>{hire.role}</td>
      <td>{hire.location}</td>
      <td>{hire.ctc}</td>
      <td>{hire.endDate.split('-').reverse().join('-')}</td>
    </tr>
  ))}

              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default StuPending;
