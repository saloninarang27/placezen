import React, { useEffect, useState } from "react";
import "../CSS/CampusDrive.css";
import { Link, useParams } from "react-router-dom";
import Header from "../sidebar/Header";
import Sidebar from "../sidebar/Sidebar";

function CampusDrive() {
  let [hiring, setHiring] = useState([]);
  let { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("In Progress"); // State to track the active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/Hiring/get`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHiring(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: "Dashboard" },
    { path: `/StuProfilePage/${Id}`, label: "Profile" },
    { path: `/StuPending/${Id}`, label: "Pending" },
    { path: "/", label: "Logout" },
  ];

  // Filtering hiring data into "In Progress" and "Completed"
  const inProgress = hiring.filter(hire => hire.status === "In Progress");
  const completed = hiring.filter(hire => hire.status === "Completed");

  // Function to render the active tab content
  const renderTabContent = () => {
    const data = activeTab === "In Progress" ? inProgress : completed;

    return data.length > 0 ? (
      data.map(hire => (
        <Link
        key={hire.jobId}
        className="campus-drive-link"
        to={
          activeTab === "In Progress"
            ? `/Ongoing/${Id}/${hire.job_id}`
            // ?`Ongoing/${Id}/${hire.job_id}`
            : `/Completed/${hire.company_name}/${Id}/${hire.job_id}`
        }
      >
          <div className="campus-drive-item">
            <h2>{hire.company_name}</h2>
            <h4>ROLE: {hire.role}</h4>
            <h4>LOCATION: {hire.location}</h4>
            <h4>CTC: {hire.ctc / 100000} LPA</h4>
          </div>
        </Link>
      ))
    ) : (
      <p className="no-data-message">No {activeTab.toLowerCase()} recruitments available.</p>
    );
  };

  return (
    <div className="campus-drive-container">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      <main className="campus-drive-content">
        {/* <h1 className="campus-drive-title">Campus Recruitment</h1> */}
        {/* Tab Navigation */}
        <div className="campus-drive-tabs">
          <button
            className={`campus-drive-tab ${activeTab === "In Progress" ? "active" : ""}`}
            onClick={() => setActiveTab("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`campus-drive-tab ${activeTab === "Completed" ? "active" : ""}`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
          </button>
        </div>
        {/* Tab Content */}
        <div className="campus-drive-list">{renderTabContent()}</div>
      </main>
    </div>
  );
}

export default CampusDrive;
