import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import boy from "../Pics/boy.jpg";
import girl from "../Pics/girl.jpg";
import "./StAlumni.css";

function StAlumni() {
  const { Id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/alumini/find`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data);
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
    { path: `/changePass/${Id}`, label: 'Password' },
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

      <main>
        <div className="page-header">
          <h1><center>Our Alumni</center></h1>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="alumni-list">
            {result.map(alumnus => (
              <div className="alumni-card" key={alumnus.id}>
                <Link to={`/StAluminiDetails/${alumnus.roll}/${Id}`} className="alumni-link">
                  <div className="alumni-info">
                    <img
                      src={alumnus.gender === 'Female' ? girl : boy}
                      alt="Alumni"
                      className="alumni-image"
                    />
                    <div className="alumni-details">
                      <h2 className="alumni-name">{alumnus.name}</h2>
                      <p className="alumni-description">{alumnus.description}</p>
                      <p className="alumni-batch"><b>Batch:</b> {alumnus.session} - {alumnus.session + 4}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default StAlumni;
