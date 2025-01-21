import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../sidebar/Header';
import Sidebar from '../sidebar/Sidebar';

function AdminPrepMaterial() {
    const {Id}=useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const sidebarLinks = [
        { path: `/AdminProfilePage/${Id}`, label: 'Profile' },
        { path: `/AdminApprovals/${Id}`, label: 'Approvals' },
        { path: `/Alumni/${Id}`, label: 'Alumni' },
        { path: `/Adminresult/${Id}`, label: 'Results' },
        { path: `/AdminCoordinators/${Id}`, label: 'T & P Coordinators' },
        { path: '/', label: 'Logout' },
      ];

 const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const navigate=useNavigate()

       useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/post/all`);
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
    <div className="table-wrapper" style={{ marginLeft: "2%" }}>

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
      <div className="upload-container" style={{marginLeft:"37%"}}>
        <button className="upload-btn" onClick={()=>{navigate(`/Upload-Content/${Id}`)}} >
          Upload New File
        </button>
      </div>
    </div>
  )}
</main>

    
    </div>
  )
}

export default AdminPrepMaterial