import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import boy from "../Pics/boy.jpg";


function AlumniDetail() {
  let { Id, Idd } = useParams();
  const [student, setStudent] = useState(null);
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/alumini/asl/${Id}`);
        const response2 = await fetch(`http://localhost:5000/alumini/asls/${Id}`);
        
        if (!response.ok || !response2.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const data2 = await response2.json();
        
        setStudent(data);
        setAlumni(data2);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [Id]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!student || !alumni) {
    return <div>Data not available</div>;
  }

  return (
    <div>
      <div id="bcd">I.K. Gujral Punjab Technical University</div>
      <div id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
        <Link id="llll" to={`/AdminProfile/${Idd}`}><span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
        <Link id="llll" to={`/AdminProfilePage/${Idd}`}><span className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
        <Link id="llll" to="/"><span className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>

      <div id="iui">Our Alumni</div>

      <div className="conti">
        <div id="sidu">
          <span><b><center>Personal Details</center></b></span><br />
          <center><img width="100px" height="100px" src={boy} alt="Avatar" /></center>
          <div id="sidud">
            <div id="sidudd">Full Name</div>
            <div id="sidudd">{student.name}</div>
          </div>
          <div id="sidud">
            <div id="sidudd">Designation</div>
            <div id="sidudd"><b>{alumni.job}</b></div>
          </div>
          <div id="sidud">
            <div id="sidudd">Batch</div>
            <div id="sidudd">{student.ssession}-{student.ssession + 4}</div>
          </div>
        </div>

        <div id="sidu">
          <span><b><center>Contact Details</center></b></span><br />
          <div id="sidud">
            <div id="sidudd">Linkedin</div>
            <div id="sidudd">{student.linkedin}</div>
          </div>
          <div id="sidud">
            <div id="sidudd">Email</div>
            <div id="sidudd">{student.email}</div>
          </div>
          <div id="sidud">
            <div id="sidudd">Portfolio</div>
            <div id="sidudd">{student.portfolio}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDetail;
