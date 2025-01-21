import React from "react";
import { Link, useParams } from "react-router-dom";
function PostStudent(){
  let{Id}=useParams();
  return(
    <div>
       <div id="bcd"> I.K. Gujral Punjab Technical University</div>
       <div  id="mySidebar">
        <span className="s2" id="sus">Welcome</span>
          {/* <span className="s1"><img id ="simg" height="120" width="120"  ></img></span> */}
          <Link id="llll" to={`/AddHiringStudent/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Post Online Hiring</span></Link>
          <Link id="llll" to={`/stPostMaterial/${Id}`} > <span  className="s1" style={{ fontSize: '20px' }}>Post Material</span></Link>
           <Link id="llll" to="/"> <span  className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
      </div>
      <div id="iui">Post</div>
       
       {/* <div id="box1"><h2 id="boxspan1">Off Campus Result</h2></div> */}
       {/* <Link to={`/AddHiringStudent/${Id}`}><div id="box2"><h2 id="boxspan1">Online Hiring</h2></div></Link>
       <Link to={`/stPostMaterial/${Id}`}><div id="box3"><h2 id="boxspan1">Preparation Material</h2></div></Link> */}

    </div>
  )
}
export default PostStudent;