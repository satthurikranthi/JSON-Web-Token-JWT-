import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const ageInputRef = useRef();
    const emailInputRef = useRef(); 
    const passwordInputRef = useRef(); 
    const mobileNoInputRef = useRef();
    const profilepicInputRef = useRef();
    const [profilePicPath, setProfilePicPath] = useState("./images/dummy.jpg");

    // Submit using JSON
    const onSubmitUsingJSON = async () => {
        const dataToSend = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            age: ageInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            mobileNo: mobileNoInputRef.current.value,
            profilepic: profilepicInputRef.current.value,
        };

        const dataToSendJSON = JSON.stringify(dataToSend);
        const myHeader = new Headers();
        myHeader.append("content-type", "application/json");

        const reqOptions = {
            method: "POST",
            body: dataToSendJSON,
            headers: myHeader,
        };

        const JSONData = await fetch("http://localhost:4567/signup", reqOptions);
        const JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

    // Submit using URL-encoded
    const onSubmitUsingURLEncoded = async () => {
        const dataToSend = new URLSearchParams();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNo", mobileNoInputRef.current.value);
        dataToSend.append("profilepic", profilepicInputRef.current.value);

        const myHeader = new Headers();
        myHeader.append("content-type", "application/x-www-form-urlencoded");

        const reqOptions = {
            method: "POST",
            body: dataToSend,
            headers: myHeader,
        };

        const JSONData = await fetch("http://localhost:4567/signup", reqOptions);
        const JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

    // Submit using FormData
    const onSubmitUsingFormData = async () => {
        const dataToSend = new FormData();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNo", mobileNoInputRef.current.value);
        for(let i=0;i<=profilepicInputRef.current.files.length;i++){
            dataToSend.append("profilepic", profilepicInputRef.current.files[i]);

        }
        
    

        const reqOptions = {
            method: "POST",
            body: dataToSend,
        };

        const JSONData = await fetch("http://localhost:4567/signup", reqOptions);
        const JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

    return (
        <div className="App">
        <form>
            <h2>Signup</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef} name="firstName" />
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef} name="lastName" />
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef} name="age" />
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef} name="email" />
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef} name="password" />
            </div>
            <div>
                <label>Mobile No</label>
                <input ref={mobileNoInputRef} name="mobileNo" />
            </div>
            <div>
                <label>Profile Pic</label>
                <input
                    ref={profilepicInputRef}
                    type="file"
                  
                    onChange={(event) => {
                        const selectedPicPath = URL.createObjectURL(event.target.files[0]);
                        setProfilePicPath(selectedPicPath);
                    }}
                />
            </div>
            <div>
                <img className="profilepicpreview" src={profilePicPath} alt="Profile Preview" />
            </div>
            <div>
                <button type="button" onClick={onSubmitUsingJSON}>
                    Submit Using JSON
                </button>
                <button type="button" onClick={onSubmitUsingURLEncoded}>
                    Submit Using URLEncoded
                </button>
                <br />
                <button type="button" onClick={onSubmitUsingFormData}>
                    Submit Using FormData
                </button>
            </div>
        </form>
         <div>
         <Link to="/">Login</Link>
     </div>
    </div>
    );
}

export default Signup;