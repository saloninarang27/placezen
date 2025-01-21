import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';
import './PrepMaterial.css'; // Ensure you have the corresponding CSS file

function PrepMaterial() {
  const { Id } = useParams();
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/post/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const update = async (Id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/post/gett/${Id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Check if the content type is a file
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/pdf')) {
        // If it's a file, create a blob and initiate a download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${Id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Invalid content type');
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
    }
  };

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

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
    
    <main className="main-content">
        <div className="page-title">Study Materials</div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="table-wrapper">
            <table className="material-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Pdf Name</th>
                  <th>Posted On</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={material.id}>
                    <td>{index + 1}</td>
                    <td>{material.description}</td>
                    <td>{material.postDate}</td>
                    <td>
                      <button 
                        onClick={() => update(material.id)} 
                        className="download-btn"
                      >
                        Download File
                      </button>
                    </td>
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

export default PrepMaterial;
