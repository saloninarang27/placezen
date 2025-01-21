import React, { useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import "../CSS/AddAdmin.css"
function AddAdmins()
{ let{Id}=useParams();
  let[name,setName]=useState("")
  let[phone,setPhone]=useState("")
  let[email,setEmail]=useState("")
  let[linkdin,setLinkdin]=useState("")
  let[designation,setDesignation]=useState("")
  let[department,setDepartment]=useState("")
  let[username,setUsername]=useState("")
  let[password,setPassword]=useState("")
  const navigate = useNavigate();

  function input1(event){
    console.log(event.target.value);
    setName(event.target.value);
  }
  function input2(event){
    console.log(event.target.value);
    setPhone(event.target.value);
  }
  function input3(event){
    console.log(event.target.value);
    setEmail(event.target.value);
  } 
  function input4(event){
    console.log(event.target.value);
    setLinkdin(event.target.value);
  } function input5(event){
    console.log(event.target.value);
    setDesignation(event.target.value);
  } function input6(event){
    console.log(event.target.value);
    setDepartment(event.target.value);
  }
  function input7(event){
    console.log(event.target.value);
    setUsername(event.target.value);
  }
  function input8(event){
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  function submit(event){
    console.log("sonu")
     event.preventDefault();
    const formdata = new FormData();
    formdata.append('name',name)
    formdata.append('phone',phone)
    formdata.append('email',email)
    formdata.append('linkdin',linkdin)
    formdata.append('designation',designation)
    formdata.append('department',department)
    formdata.append('username',username)
    formdata.append('password',password)
    

    
    fetch('http://localhost:5000/Admin/add', {
      method:'POST',
      body: formdata,
    
    })
      .then(response => response.text())
      .then(data => {
        console.log('SignUp successful:', data);
        // alert("Request Sent , Please Wait for confirmation !!!");
         navigate(`/AdminProfile/${Id}`);
        
       
      })
      .catch(error => {
        console.error('Error during SignUp:', error);
      });
  }
   

   
    


  


  
    return(
        <div>
        <div id="bcd"> I.K. Gujral Punjab Technical University</div>
        <div  id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll"  to={`/AdminProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
          <Link id="llll" to={`/AdminProfilePage/${Id}`}> <span  className="s1" style={{ fontSize: '20px' }}>Profile</span></Link>
           <Link id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui">Add New Admin</div>

      <div id="fd">
      <br></br>
        <label> Admin Name :</label><br></br>
        <input id="ip" value={name} onChange={input1}></input><br></br>
        <label> Phone :</label><br></br>
        <input value={phone} onChange={input2}></input><br></br>
        <label> Email :</label><br></br>
        <input value={email} onChange={input3}></input><br></br>
        <label> Linkedin :</label><br></br>
        <input value={linkdin} onChange={input4}></input><br></br>
        <label> Designation :</label><br></br>
        <input value={designation} onChange={input5}></input><br></br>
        <label> Department :</label><br></br>
        <input value={department} onChange={input6}></input><br></br>
        <label> Username :</label><br></br>
        <input value={username} onChange={input7}></input><br></br>
        <label> Password :</label><br></br>
        <input value={password} onChange={input8}></input><br></br><br></br>

        <button onClick={submit} style={{ width:'20%', backgroundColor: 'green', color: '#fff', marginLeft:'10%',marginRight: '8%', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
      </div>


        </div>
    )
}
export default AddAdmins;