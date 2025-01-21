import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";

function Login() {
  let [Username, setUsername] = useState("2124402");
  let [Password, setPassword] = useState("123456");
  let [Id, setId] = useState("");

  function input1(event) {
    console.log(event.target.value);
    setUsername(event.target.value);
  }

  function input2(event) {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/student/GetProfile/${Username}/${Password}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setId(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
    if (Username || Password) {
      console.log(Username + " " + Password);
      fetchData();
    }
  }, [Username, Password]);

  return (
    <div>
      <div id="bcd">I.K. Gujral Punjab Technical University</div>
      <div id="mmm">
        <h2><center>Welcome to PlaceZen</center></h2>
        <h2 id="hxx"><center>Student</center></h2>
        <div id="mmm1">
          <label htmlFor="username"><center>Username</center></label>
          <center>
            <input
              id="username"
              className="form-input"
              value={Username}
              onChange={input1}
              placeholder="Username"
            />
          </center>
          <center><label htmlFor="password">Password</label></center>
          <center>
            <input
              id="password"
              className="form-input"
              value={Password}
              onChange={input2}
              type="password"
              // placeholder="123456"
            />
          </center>
          <center>
            <button id="boss">
              <Link to={`/StudentProfile/${Id}`}>Login</Link>
            </button>
          </center>
          <center>Create an account <span><Link to="/SignUp" className="signup-link">SignUp</Link></span></center>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;
