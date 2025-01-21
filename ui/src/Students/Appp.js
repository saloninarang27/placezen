import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./Allstudents.css"

function AllStudents() {
    let { Id } = useParams();
    let [students, setStudents] = useState([]);
    let [dept, setDept] = useState("CSE");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8050/student/stu/${dept}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching data: ', error.message);
            }
        };

        fetchData();
    }, [dept]);

    const branchHandler = (branch) => {
        setDept(branch);
    };

    return (
        <div>
            <div id="bcd">I.K. Gujral Punjab Technical University</div>

            <div id="mySidebar">
                <span className="s2" id="sus">Branches</span>
                <span onClick={() => branchHandler("CSE")} className="s1">Computer Science</span>
                <span onClick={() => branchHandler("ECE")} className="s1">Electronics</span>
                <span onClick={() => branchHandler("EE")} className="s1">Electrical</span>
                <span onClick={() => branchHandler("Civil")} className="s1">Civil</span>
                <span onClick={() => branchHandler("ME")} className="s1">Mechanical</span>
                <Link id="llll" to={`/AdminProfile/${Id}`}>
                    <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span>
                </Link>
            </div>
            <div id="iui">{dept} students</div>

            <div>

                <table id="tabu">
                    <thead className="tt" id="tabuh">
                        <tr>
                            <th>Sl No.</th>
                            <th>Student Name</th>
                            <th>Session</th>
                            <th>Roll Number</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.ssession} - {student.ssession + 4}</td>
                                <td>{student.roll}</td>
                                <td>{student.branch}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>



            </div>
            <ReactHTMLTableToExcel

                    id="test-table-xls-button"
                    className="ccc"
                    table="tabu"
                    filename="students"
                    sheet="students_sheet"
                    buttonText="Download as Excel"
                     />
        </div>
    );
}

export default AllStudents;
