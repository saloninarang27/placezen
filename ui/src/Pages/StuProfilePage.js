import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";
import "../CSS/StProfile.css"; // Ensure you have the corresponding CSS file

function StuProfilePage() {
  const [profile, setProfile] = useState({});
  // const [imageURL, setImageUrl] = useState("");
  const { Id } = useParams();
  const [position, setPosition] = useState("");
  const [journey, setJourney] = useState("");
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [session, setSession] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handlePositionChange(event) {
    setPosition(event.target.value);
  }

  function handleJourneyChange(event) {
    setJourney(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('SRoll', roll);
    formData.append('SName', name);
    formData.append('Session', session);
    formData.append('Jobs', position);
    formData.append('Description', journey);

    fetch(`${process.env.REACT_APP_API_ROOT_URL}/alumini/add`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        console.log('Request sent successfully:', data);
        alert("Successfully updated!");
      })
      .catch(error => {
        console.error('Error during update:', error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/student/getStudent/${Id}`);
        const response2 = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/student/downloadImage/${Id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const imageBlob = await response2.blob();
        const imageObjectUrl = URL.createObjectURL(imageBlob);

        setProfile(data);
        setRoll(data.roll);
        setName(data.name);
        setSession(data.ssession);
        // setImageUrl(imageObjectUrl);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
    fetchData();
  }, [Id]);

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

      <div className={`profile-content ${sidebarOpen ? 'profile-content-with-sidebar' : ''}`}>
       

          <div className="profile-main">
            <div className="profile-info">
              <div className="profile-info-section">
                <label>Name</label>
                <input value={profile.name} disabled />
              </div>
              <div className="profile-info-section">
                <label>Session</label>
                <input value={`${profile.ssession} - ${profile.ssession + 4}`} disabled />
              </div>
              <div className="profile-info-section">
                <label>Branch</label>
                <input value={profile.branch} disabled />
              </div>
              <div className="profile-info-section">
                <label>Roll No</label>
                <input value={profile.roll} disabled />
              </div>
              <div className="profile-info-section">
                <label>Semester</label>
                <input value={profile.semester < 9 ? `${profile.semester}th` : "Degree Completed"} disabled />
              </div>
            </div>

            <div className="profile-contact">
              <div className="profile-contact-section">
                <label>Mobile</label>
                <input value={profile.mobile} disabled />
              </div>
              <div className="profile-contact-section">
                <label>Email</label>
                <input value={profile.email} disabled />
              </div>
              <div className="profile-contact-section">
                <label>LinkedIn</label>
                <input value={profile.linkedin} disabled />
              </div>
              <div className="profile-contact-section">
                <label>GitHub</label>
                <input value={profile.github} disabled />
              </div>
              <div className="profile-contact-section">
                <label>Portfolio</label>
                <input value={profile.portfolio} disabled />
              </div>
            </div>

            <div className="profile-extra">
              <div className="profile-extra-section">
                <label>Average CGPA</label>
                <input value={profile.cgpa} disabled />
              </div>
              <div className="profile-extra-section">
                <label>Backlogs</label>
                <input value={profile.backlog} disabled />
              </div>
              <div className="profile-extra-section">
                <label>Experiences</label>
                <input value={profile.experience} disabled />
              </div>
              <div className="profile-extra-section">
                <label>Skills</label>
                <input value={profile.skills} disabled />
              </div>
              <div className="profile-extra-section">
                <label>Interest</label>
                <input value={profile.interest} disabled />
              </div>
            </div>

            {profile.semester === 9 && (
              <div className="profile-update">
                <textarea
                  value={position}
                  onChange={handlePositionChange}
                  rows="3"
                  cols="60"
                  placeholder="Share Current Position & Institution"
                />
                <textarea
                  value={journey}
                  onChange={handleJourneyChange}
                  rows="7"
                  cols="60"
                  placeholder="Share your Placement Journey...."
                />
                <button onClick={handleSubmit} className="update-button">Update Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
}

export default StuProfilePage;
