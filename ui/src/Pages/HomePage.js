import React from "react";
import { Link } from "react-router-dom";
import ptuMain from "../Pics/ptuMain.jpg";
import "../CSS/HomePage.css";

function HomePage() {
  return (
    <div>
      <div id="header"> I.K. Gujral Punjab Technical University</div>
      <div id="content">
        <div id="welcomeSection">
          <h1 id="welcomeHeading">Welcome!</h1>
          <button className="button studentButton">
            <Link className="link studentLink" to="/StudentLogin">Student</Link>
          </button>
          <br /><br />
          <button className="button adminButton">
            <Link className="link adminLink" to="/AdminLogin">Admin</Link>
          </button>
        </div>
        <div id="imageSection">
          <img id="mainImage" src={ptuMain} alt="PTU Main" />
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;
