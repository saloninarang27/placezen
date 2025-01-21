import React, { useEffect, useState } from "react";
import "./Adminresult.css"
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Adminresult() {
  let { Id } = useParams();
  const [company, setCompany] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  var i = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/result/allC");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company data: ', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/student/allS");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setResult(data);
      } catch (error) {
        console.error('Error fetching result data: ', error.message);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
    fetchData();
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    // { path: `/CompanyWiseResult/${index}/${Id}`, label: "Statics" },
    // 
    // { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];


  return (
    <div>
      <div id="bcd"> I.K. Gujral Punjab Technical University</div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />
      

     
      <div id="iui">Placed Students</div>
      <Link id="addu" to={`/AddResult/${Id}`}><button >Add more results</button></Link>
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
                    <td>{i++}</td>
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

export default Adminresult;
