import React, { useEffect, useState } from "react";
import "../CSS/OffHiring.css";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function OffHiring() {
  const [hiring, setHiring] = useState([]);
  const [activeTab, setActiveTab] = useState("In Progress"); // Default tab is "In Progress"
  let { Id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Hiring/get`);
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
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/AdminProfilePage/${Id}`, label: "Profile" },
    { path: "/", label: "Logout" },
  ];

  // Filter hiring data based on the active tab
  const filteredData = hiring.filter((hire) => {
    if (activeTab === "In Progress") return hire.status === "In Progress";
    if (activeTab === "Completed") return hire.status === "Completed";
    if (activeTab === "Upcoming") return hire.status === "Upcoming";
    return [];
  });

  return (
    <div>
      <div id="bcd" style={{marginLeft:"20%"}}>I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      {/* <div id="iui">Campus Recruitment</div> */}
      <div id="offf">
        <div id="off1"></div>
        <Link id="lola" style={{textDecoration:"none"}} to={`/addHiring/${Id}`}>
          <div id="off2" >Add More +</div>
        </Link>
      </div>

      {/* Tabs for sections */}
      <div id="tabs" style={{marginLeft:"20%"}}>
        <button
          className={`tab ${activeTab === "In Progress" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("In Progress")}
        >
          On Going
        </button>
        <button
          className={`tab ${activeTab === "Completed" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </button>
        <button
          className={`tab ${activeTab === "Upcoming" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("Upcoming")}
        >
          Upcoming
        </button>
      </div>

      {/* Content based on active tab */}
      <Section title={activeTab} data={filteredData} Id={Id} activeTab={activeTab} />
    </div>
  );
}

function Section({ title, data, Id, activeTab }) {
  return (
    <div>
      {/* <h2 style={{ marginLeft: "26%", marginTop: "30px" }}>{title}</h2> */}
      <div id="doremon">
        {data.length > 0 ? (
          data.map((hire) => {
            let linkPath = "";
            if (activeTab === "In Progress") {
              linkPath = `/responseSheet/${Id}/${hire.job_id}`;
            } else if (activeTab === "Completed") {
              linkPath = `/Completed/${hire.company_name}/${Id}/${hire.job_id}`;
            } else if (activeTab === "Upcoming") {
              linkPath = `/Upcoming/${Id}/${hire.job_id}`;
            }

            return (
              <Link key={hire.jobId} id="lalu" to={linkPath}>
                <div id="thisthat">
                  <h2>{hire.company_name}</h2>
                  <h4>ROLE : {hire.role}</h4>
                  <h4>LOCATION : {hire.location}</h4>
                  <h4>CTC : {hire.ctc / 100000} LPA</h4>
                </div>
              </Link>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "gray", marginTop: "20px" }}>
            No {title} Hiring Data Available.
          </p>
        )}
      </div>
    </div>
  );
}

export default OffHiring;
