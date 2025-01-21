import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import '../CSS/StApplied.css'; // Ensure you have the corresponding CSS file

function StuApplied() {
  const { Id } = useParams();
  const [hiring, setHiring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/Applied/find/${Id}`);
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

  function convertDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
    { path: `/StuPending/${Id}`, label: 'Pending' },
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
        <div className="page-header">Applied Forms</div>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>CTC</th>
                  <th>Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {hiring.map((hire, index) => (
                  <tr key={index}>
                    <td>{hire.companyName}</td>
                    <td>{hire.role}</td>
                    <td>{hire.location}</td>
                    <td>{hire.ctc}</td>
                    <td>{convertDate(hire.dateApplied)}</td>
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

export default StuApplied;
