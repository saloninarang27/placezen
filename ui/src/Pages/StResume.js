import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/StResume.css";
// import boy from "../Pics/boy.jpg";

function StResume() {
    let { Id } = useParams();
    let [file, setFile] = useState(null);
    let [imageURL, setImageUrl] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8050/resume/show/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not okk');
                }
                const imageBlob = await response.blob();
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageObjectUrl);
            } catch (error) {
                console.error('Error fetching data: ', error.message);
            }
        };
        fetchData();
    }, [Id]);

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function upload(event) {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('sid', Id);
        formdata.append('file', file);
        fetch('http://localhost:8050/resume/upload', {
            method: 'POST',
            body: formdata,
        })
        .then(response => response.text())
        .then(data => {
            console.log('Uploaded:', data);
            alert("Resume Updated !!!");
        })
        .catch(error => {
            console.error('Error during upload:', error);
        });
    }

    function enlargeImage() {
        // Display full-size image in an overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        const img = document.createElement('img');
        img.src = imageURL;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        overlay.appendChild(img);
        document.body.appendChild(overlay);
    }

    return (
        <div>
            <div id="bcd"> I.K. Gujral Punjab Technical University</div>
            <div id="mySidebar">
                <span className="s2" id="sus">Welcome </span>
                <Link id="llll" to={`/StudentProfile/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Dashboard</span></Link>
                <Link id="llll" to={`/changePass/${Id}`}> <span className="s1" style={{ fontSize: '20px' }}>Password</span></Link>
                <Link id="llll" to="/"> <span className="s1" style={{ fontSize: '20px' }}>Logout</span></Link>
            </div>
            <div id="iui">Resume</div>
            <div id="resu">
                <img src={imageURL} width="340px" alt="No image to Display" onClick={enlargeImage} style={{ cursor: 'pointer' }} />
                <br></br>
                <input
                    type="file"
                    id="fileInput"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="fileInput" style={{ cursor: 'pointer', color: 'crimson', textDecoration: 'underline' }}>
                    {file ? file.name : 'Choose another resume'}
                </label>
                &nbsp;&nbsp;&nbsp;
                <button
                    onClick={upload}
                    style={{
                        width: '20%',
                        backgroundColor: 'green',
                        color: '#fff',
                        marginTop: '2%',
                        marginRight: '8%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Update Resume
                </button>
            </div>
        </div>
    );
}

export default StResume;
