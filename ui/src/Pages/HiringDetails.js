// import React, { useEffect, useState } from "react";
// import {  useParams } from "react-router-dom";
// import "../CSS/HiringDetails.css";
// import Header from '../sidebar/Header';
// import Sidebar from "../sidebar/Sidebar";

// function HiringDetails() {
//   let { Id, JobId } = useParams();
//   const currentDate = new Date();
//   const [hiring, setHiring] = useState("");
//   const [flag, setFlag] = useState(0);
//   const [interest, setInterest] = useState(0);
//   const [status, setStatus] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   function input1(event) {
//     const value = event.target.value;
//     setInterest(value === "Yes" ? 1 : 0);
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//          `${process.env.REACT_APP_API_ROOT_URL}/result/verify/${Id}/${JobId}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not okk");
//         }
//         const data = await response.json();
//         setStatus(data);
//       } catch (error) {
//         console.error("Error fetching data: ", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [Id, JobId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_ROOT_URL}/Hiring/fetch/${JobId}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not okk");
//         }
//         const data = await response.json();
//         setHiring(data);
//       } catch (error) {
//         console.error("Error fetching data: ", error.message);
//       }
//     };
//     fetchData();
//   }, [JobId]);

//   const adding = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_ROOT_URL}/Applied/check/${Id}/${JobId}`
//       );
//       if (!response.ok) {
//         alert("Already Filled !!!");
//         throw new Error("Network response was not okk");
//       }

//       const data = await response.json();
//       if (data === 0) setFlag(1);
//     } catch (error) {
//       console.error("Error fetching data: ", error.message);
//     }

//     if (interest === 1 && flag === 1) {
//       const formData = new FormData();
//       formData.append("Jobid", JobId);
//       formData.append("StudentId", Id);
//       formData.append("date", currentDate);

//       fetch(`${process.env.REACT_APP_API_ROOT_URL}/Applied/added`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.text())
//         .then((data) => {
//           alert("Submitted !!");
//           setFlag(0);
//         })
//         .catch((error) => {
//           console.error("Error during Added:", error);
//         });
//     }
//   };

//   const sidebarLinks = [
//     { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
//     { path: `/StuProfilePage/${Id}`, label: 'Profile' },
//     { path: '/', label: 'Logout' }
//   ];

//   return (
//     <div>

//       <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//       <Sidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         links={sidebarLinks}
//       />
//       <main className="content">
//         {/* <div id="iui">Hiring Details</div> */}
//         {loading ? (
//           <div className="loader"></div>
//         ) : (
//           <div id="gupta">
//             <div id="hrd">
//               <div className="detail-row">
//                 <div className="detail-label">Company Name:</div>
//                 <div className="detail-value">{hiring.companyName}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Location:</div>
//                 <div className="detail-value">{hiring.location}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Role:</div>
//                 <div className="detail-value">{hiring.role}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Eligible Branch:</div>
//                 <div className="detail-value">{hiring.branch}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">CTC:</div>
//                 <div className="detail-value">{hiring.ctc / 100000} LPA</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Maximum Backlogs:</div>
//                 <div className="detail-value">{hiring.backlog}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Description details:</div>
//                 <div className="detail-value">{hiring.description}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Cgpa:</div>
//                 <div className="detail-value">{hiring.cgpa}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Eligible Batch:</div>
//                 <div className="detail-value">{hiring.startSession} - {hiring.startSession + 4}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Eligible Semester:</div>
//                 <div className="detail-value">{hiring.semester}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Application Starting Date:</div>
//                 <div className="detail-value">{hiring.startDate}</div>
//               </div>
//               <div className="detail-row">
//                 <div className="detail-label">Application Closing Deadline:</div>
//                 <div className="detail-value">{hiring.endDate}</div>
//               </div>
//             </div>
//             <div id="opl">
//               <h2>Are you Interested?</h2>
//               <div id="sj">
//                 <input
//                   type="radio"
//                   id="yes"
//                   name="Are You Interested?"
//                   value="Yes"
//                   onChange={input1}
//                 />
//                 <label htmlFor="yes">YES</label> &nbsp;&nbsp;&nbsp;
//                 <input
//                   type="radio"
//                   id="no"
//                   name="Are You Interested?"
//                   value="No"
//                   onChange={input1}
//                 />
//                 <label htmlFor="no">NO</label>
//                 <br /><br />
//                 <button
//                   onClick={adding}
//                   disabled={status >= 2}
//                   title={status >= 2 ? "You are Already Placed 2 in Company whose CTC is higher than this" : ""}
//                   style={{
//                     backgroundColor: status >= 2 ? "lightgray" : "green",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                     padding: "10px 20px",
//                     cursor: status >= 2 ? "not-allowed" : "pointer",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                     outline: "none"
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//               </div>

//       <div id="bcd">I.K. Gujral Punjab Technical University</div>
//       <div id="mySidebarrr">
//         <span className="s2" id="sus">Welcome</span>
//         <Link id="llll" to={`/StudentProfile/${Id}`}>
//           <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span>
//         </Link>
//         <Link id="llll" to={`/StuProfilePage/${Id}`}>
//           <span className="s1" style={{ fontSize: '20px' }}>Profile</span>
//         </Link>
//         <Link id="llll" to="/">
//           <span className="s1" style={{ fontSize: '20px' }}>Logout</span>
//         </Link>
//       </div>
//       <div id="iui">Hiring Details</div>
//       {loading ? (
//         <div className="loader"></div>
//       ) : (
//         <div id="gupta">
//           <div id="hrd">
//             {/* <h1>{hiring.companyName}</h1>  */}
//             <div id="hihi">{hiring.companyName}</div>
//             <h3>Location : {hiring.location}</h3>
//             <h3>Role : {hiring.role}</h3>
//             <h3>Eligible Branch : {hiring.branch}</h3>
//             <h3>CTC : {hiring.ctc / 100000} LPA</h3>
//             <h3>Maximum Backlogs : {hiring.backlog}</h3>
//             <h3>Description details : {hiring.description}</h3>
//             <h3>Cgpa : {hiring.cgpa}</h3>
//             <h3>Eligible Batch : {hiring.startSession} - {hiring.startSession + 4}</h3>
//             <h3>Eligible Semester : {hiring.semester}</h3>
//             <h3>Application Starting Date : {hiring.startDate}</h3>
//             <h3>Application Closing Deadline : {hiring.endDate}</h3>
//           </div>
//           <div id="opl">
//             <h2>Are you Interested?</h2>
//             <div id="sj">
//               <input type="radio" id="yes" name="Are You Interested?" value="Yes" onChange={input1} />
//               <label htmlFor="yes">YES</label> &nbsp;&nbsp;&nbsp;

//               <input type="radio" id="no" name="Are You Interested?" value="No" onChange={input1} />
//               <label htmlFor="no">NO</label>
//               <br /><br />
//               <button
//   onClick={adding}
//   disabled={status >= 1}
//   title={status >= 1 ? "You are Already Placed  in Company whose CTC is higher than this" : ""}
//   style={{
//     backgroundColor: status >= 1 ? "lightgray" : "green",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     cursor: status >= 1 ? "not-allowed" : "pointer",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     outline: "none"
//   }}
// >
//   Submit
// </button>


//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default HiringDetails;



import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import "../CSS/HiringDetails.css";
import Header from '../sidebar/Header';
import Sidebar from "../sidebar/Sidebar";

function HiringDetails() {
  let { Id, JobId } = useParams();
  const currentDate = new Date();
  const [hiring, setHiring] = useState("");
  const [flag, setFlag] = useState(0);
  const [interest, setInterest] = useState(0);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function input1(event) {
    const value = event.target.value;
    setInterest(value === "Yes" ? 1 : 0);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
         `${process.env.REACT_APP_API_ROOT_URL}/result/verify/${Id}/${JobId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not okk");
        }
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Id, JobId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ROOT_URL}/Hiring/fetch/${JobId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not okk");
        }
        const data = await response.json();
        setHiring(data);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };
    fetchData();
  }, [JobId]);

  const adding = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT_URL}/Applied/check/${Id}/${JobId}`
      );
      if (!response.ok) {
        alert("Already Filled !!!");
        throw new Error("Network response was not okk");
      }

      const data = await response.json();
      if (data === 0) setFlag(1);
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }

    if (interest === 1 && flag === 1) {
      const formData = new FormData();
      formData.append("Jobid", JobId);
      formData.append("StudentId", Id);
      formData.append("date", currentDate);

      fetch(`${process.env.REACT_APP_API_ROOT_URL}/Applied/added`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          alert("Submitted !!");
          setFlag(0);
        })
        .catch((error) => {
          console.error("Error during Added:", error);
        });
    }
  };

  const sidebarLinks = [
    { path: `/StudentProfile/${Id}`, label: 'Dashboard' },
    { path: `/StuProfilePage/${Id}`, label: 'Profile' },
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
      <main className="content">
        {/* <div id="iui">Hiring Details</div> */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div id="gupta">
            <div id="hrd">
              <div className="detail-row">
                <div className="detail-label">Company Name:</div>
                <div className="detail-value">{hiring.companyName}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Location:</div>
                <div className="detail-value">{hiring.location}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Role:</div>
                <div className="detail-value">{hiring.role}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Eligible Branch:</div>
                <div className="detail-value">{hiring.branch}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">CTC:</div>
                <div className="detail-value">{hiring.ctc / 100000} LPA</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Maximum Backlogs:</div>
                <div className="detail-value">{hiring.backlog}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Description details:</div>
                <div className="detail-value">{hiring.description}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Cgpa:</div>
                <div className="detail-value">{hiring.cgpa}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Eligible Batch:</div>
                <div className="detail-value">{hiring.startSession} - {hiring.startSession + 4}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Eligible Semester:</div>
                <div className="detail-value">{hiring.semester}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Application Starting Date:</div>
                <div className="detail-value">{hiring.startDate}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Application Closing Deadline:</div>
                <div className="detail-value">{hiring.endDate}</div>
              </div>
            </div>
            <div id="opl">
              <h2>Are you Interested?</h2>
              <div id="sj">
                <input
                  type="radio"
                  id="yes"
                  name="Are You Interested?"
                  value="Yes"
                  onChange={input1}
                />
                <label htmlFor="yes">YES</label> &nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="no"
                  name="Are You Interested?"
                  value="No"
                  onChange={input1}
                />
                <label htmlFor="no">NO</label>
                <br /><br />
                <button
                  onClick={adding}
                  disabled={status >= 2}
                  title={status >= 2 ? "You are Already Placed 2 in Company whose CTC is higher than this" : ""}
                  style={{
                    backgroundColor: status >= 2 ? "lightgray" : "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: status >= 2 ? "not-allowed" : "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    outline: "none"
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HiringDetails;