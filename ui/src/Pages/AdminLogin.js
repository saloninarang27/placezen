import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/AdminLogin.css";
function AdminLogin(){
  let[Username,setUsername] = useState("");
  let[Password,setPassword] = useState("");
  let[Id,setId]=useState("");
  function input1(event){
    console.log(event.target.value);
    setUsername(event.target.value);
  }
  function input2(event){
    console.log(event.target.value);
    setPassword(event.target.value);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/Admin/getId/${Username}/${Password}`);
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        setId(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
    if(Username && Password)
        {  console.log(Username +" " + Password )
          fetchData();}

  }, [Username, Password]);
  return(
    <div>
      <div id="bcd"> I.K. Gujral Punjab Technical University</div>
      <div id="mmm">
        {/* <h2><center>Welcome to PlaceZen</center></h2> */}
        <h2 id="hxx"><center>Admin</center></h2>
        <div id="mmm1">
        <label><center>Username</center></label>
        <center><input value ={Username} onChange={input1} placeholder="Username "></input></center>
        <center><label>Password</label></center>
        <center><input value={Password} type="password" onChange={input2} placeholder="Password "></input></center>
        <center><button id="boss" ><Link to={`/AdminProfile/${Id}`}>Login</Link></button></center><br></br></div>
      </div>
    </div>
  )

}
export default AdminLogin;