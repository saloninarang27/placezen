import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
// import "./StPostMaterial.css"; // Ensure you have the corresponding CSS file

function AdminMaterialUpload() {
  let { Id } = useParams();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function input1(event) {
    setDesc(event.target.value);
  }
  const sidebarLinks = [
    { path: `/AdminProfilePage/${Id}`, label: 'Profile' },
    { path: `/AdminApprovals/${Id}`, label: 'Approvals' },
    { path: `/Alumni/${Id}`, label: 'Alumni' },
    { path: `/Adminresult/${Id}`, label: 'Results' },
    { path: `/AdminCoordinators/${Id}`, label: 'T & P Coordinators' },
    { path: '/', label: 'Logout' },
  ];


  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  function uploadFile() {
    const formData = new FormData();
    formData.append('sid', Id);
    formData.append('documentFile', file);
    formData.append('discription', desc);
    formData.append('date', formattedDate);

    fetch(`${process.env.REACT_APP_API_ROOT_URL}/post/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console('Server response:', data);
      })
      .catch(error => {
        console.error('Failed to upload file:', error);
      });
  }

  

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

      <div className={`material-main-content ${sidebarOpen ? 'material-main-content-with-sidebar' : ''}`}>
        <div id="material-title">Post Preparation Materials</div>

        <div id="material-form">
          <label htmlFor="fileInput" className="material-label">Select File: </label>
          <input type="file" id="fileInput" onChange={onFileChange} className="material-input" /><br /><br />

          <textarea value={desc} onChange={input1} placeholder="Write Description about Selected File..." className="material-textarea"></textarea>
          <button onClick={uploadFile} className="material-button">Post Material</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMaterialUpload;
