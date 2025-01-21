import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  let [Roll, setRoll] = useState("");
  let [Name, setName] = useState("");
  let [DOB, setDOB] = useState("");
  let [Mobile, setMobile] = useState("");
  let [Gender, setGender] = useState("");
  let [Email, setEmail] = useState("");
  let [Linkedin, setLinkedin] = useState("");
  let [Github, setGithub] = useState("");
  let [CGPA, setCGPA] = useState("");
  let [Skills, setSkills] = useState("");
  let [Interest, setInterest] = useState("");
  let [Portfolio, setPortfolio] = useState("");
  let [Experience, setExperience] = useState("");
  let [file, setFile] = useState(null);
  let [Password, setPassword] = useState("");
  let [Semester, setSemester] = useState("");
  let [Branch, setBranch] = useState("");
  let [Backlog, setBacklog] = useState("");
  let [session, setSession] = useState("");

  function input1(event) {
    console.log(event.target.value);
    setRoll(event.target.value);
  }
  function input2(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }
  function input3(event) {
    console.log(event.target.value);
    setDOB(event.target.value);
  }
  function input4(event) {
    console.log(event.target.value);
    setMobile(event.target.value);
  }
  function input5(event) {
    console.log(event.target.value);
    setGender(event.target.value);
  }
  function input6(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }
  function input7(event) {
    console.log(event.target.value);
    setLinkedin(event.target.value);
  }
  function input8(event) {
    console.log(event.target.value);
    setGithub(event.target.value);
  }
  function input9(event) {
    console.log(event.target.value);
    setCGPA(event.target.value);
  }
  function input10(event) {
    console.log(event.target.value);
    setSkills(event.target.value);
  }
  function input11(event) {
    console.log(event.target.value);
    setInterest(event.target.value);
  }
  function input12(event) {
    console.log(event.target.value);
    setPortfolio(event.target.value);
  }
  function input13(event) {
    console.log(event.target.value);
    setExperience(event.target.value);
  }
  function input14(event) {
    setFile(event.target.files[0]);
  }
  function input15(event) {
    console.log(event.target.value);
    setPassword(event.target.value);
  }
  function input16(event) {
    console.log(event.target.value);
    setSemester(event.target.value);
  }
  function input17(event) {
    console.log(event.target.value);
    setBranch(event.target.value);
  }
  function input18(event) {
    console.log(event.target.value);
    setBacklog(event.target.value);
  }

  function input19(event) {
    console.log(event.target.value);
    setSession(event.target.value);
  }
  function submit(event) {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('roll', Roll);
    formdata.append('name', Name);
    formdata.append('dob', DOB);
    formdata.append('mobile', Mobile);
    formdata.append('gender', Gender);
    formdata.append('email', Email);
    formdata.append('linkedin', Linkedin);
    formdata.append('github', Github);
    formdata.append('cgpa', CGPA);
    formdata.append('skills', Skills);
    formdata.append('interest', Interest);
    formdata.append('portfolio', Portfolio);
    formdata.append('experience', Experience);
    formdata.append('file', file);
    formdata.append('password', Password);
    formdata.append('semester', Semester);
    formdata.append('branch', Branch);
    formdata.append('backlog', Backlog);
    formdata.append('session', session);

    fetch('http://localhost:5000/signApprov/signup', {
      method: 'POST',
      body: formdata,
    })
      .then(response => response.text())
      .then(data => {
        console.log('SignUp successful:', data);
        alert("Request Sent, Please Wait for confirmation !!!");
        navigate("/StudentLogin");
      })
      .catch(error => {
        console.error('Error during SignUp:', error);
      });
  }

  return (
    <div>
      <div id="signup-header"> I.K. Gujral Punjab Technical University</div>
      <h1 id="signup-title">Student Registration Form</h1>
      <div id="signup-form-container">
        <div className="signup-form-section">
          <label>Roll Number</label><br />
          <input onChange={input1} value={Roll} placeholder="Roll " /><br />
          <label>Name</label><br />
          <input onChange={input2} value={Name} placeholder="Name " /><br />
          <label>Enter Start Session </label><br />
          <input onChange={input19} value={session} placeholder="Start Session " /><br />
          <label>Date of Birth</label><br />
          <input onChange={input3} value={DOB} placeholder="DOB " /><br />
          <label>Mobile</label><br />
          <input onChange={input4} value={Mobile} placeholder="Mobile " /><br />
          <label>Gender</label><br />
          <input onChange={input5} value={Gender} placeholder="Gender " /><br />
        </div>
        <div className="signup-form-section">
          <label>Email</label><br />
          <input onChange={input6} value={Email} placeholder="Email " type="email" /><br />
          <label>Linkedin</label><br />
          <input onChange={input7} value={Linkedin} placeholder="Linkedin Link " /><br />
          <label>Github</label><br />
          <input onChange={input8} value={Github} placeholder="Github Link " /><br />
          <label>CGPA</label><br />
          <input onChange={input9} value={CGPA} placeholder="CGPA(Average) " /><br />
          <label>Skills</label><br />
          <input onChange={input10} value={Skills} placeholder="Skills " /><br />
          <label>Interest</label><br />
          <input onChange={input11} value={Interest} placeholder="Interest " /><br />
          <label>Portfolio</label><br />
          <input onChange={input12} value={Portfolio} placeholder="Portfolio Link " /><br />
        </div>
        <div className="signup-form-section">
          <label>Experience</label><br />
          <input onChange={input13} value={Experience} placeholder="Experience " /><br />
          <label>Choose your Image</label><br />
          <input onChange={input14} type="file" /><br />
          <label>Password</label><br />
          <input onChange={input15} value={Password} placeholder="Password " type="password" /><br />
          <label>Semester</label><br />
          <input onChange={input16} value={Semester} placeholder="Current Semester " /><br />
          <label>Branch</label><br />
          <input onChange={input17} value={Branch} placeholder="Branch " /><br />
          <label>Backlogs if any</label><br />
          <input onChange={input18} value={Backlog} placeholder="Backlogs if any " /><br /><br />
        </div>
      </div>
      <br />
      <center>
        <button onClick={submit} id="signup-submit-btn">Register</button>
      </center>
    </div>
  );
}

export default SignUp;
