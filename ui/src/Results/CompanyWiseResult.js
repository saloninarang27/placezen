import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CompanyWiseReult.css"

function CompanyWiseResult() {
  let { comp ,Id} = useParams();
  const [result, setStudents] = useState([]);
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        const response = await fetch(`http://localhost:8050/student/details/${comp}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
    fetchData();
  }, [comp]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8050/result/allC");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div id="bcd">I.K. Gujral Punjab Technical University</div>

      <div id="mySidebar">
        <span className="s2" id="sus" >All Students</span>
        {
          company && company.map(index => (
            <Link id="llll" to={`/CompanyWiseResult/${index}/${Id}`} key={index}><span className="s1">{index}</span></Link>
          ))
        }
        <Link id="llll"  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
      </div>

      {loading ? ( // Display loading spinner while fetching data
        <div className="loader"></div> // Use CSS to style loader
      ) : (
        <div>
          <div>
            <table id="tabu">
              <thead className="tt" id="tabuh">
                <tr>
                  <th>Sl No.</th>
                  <th>Company Name</th>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Session</th>
                  <th>Branch</th>
                  <th>Role</th>
                  <th>CTC</th>
                </tr>
              </thead>
              <tbody>
                {result && result.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.compName}</td>
                    <td>{result.studName}</td>
                    <td>{result.roll}</td>
                    <td>{result.session}</td>
                    <td>{result.branch}</td>
                    <td>{result.role}</td>
                    <td>{result.ctc / 100000} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyWiseResult;
