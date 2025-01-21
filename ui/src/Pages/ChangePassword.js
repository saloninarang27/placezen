import "../CSS/changePassword.css"
function ChangePassword()
{
    return(
        <div>
         <div id="bcd"> I.K. Gujral Punjab Technical University</div>
         <div id="cp">
            <label >Enter New Password</label> <br></br>
            <input id="cpi" type="password"></input><br></br>
            <label>Confirm Password</label> <br></br>
            <input id="cpi" type="password"></input><br></br>

            <button>Change Password</button>


         </div>
        </div>
    )
}
export default ChangePassword