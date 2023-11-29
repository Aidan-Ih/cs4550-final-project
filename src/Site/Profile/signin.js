import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";
import "./style.css"
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate("/profile");
          } catch (error) {
            if (error.response && error.response.status === 401) {
              console.error('Incorrect Login Information');
              setErrorMessage('Incorrect Login Information');
            } else {
              console.error('An error occurred:', error.message);
              setErrorMessage('An error occurred: ' + error.message);
            }
          }
    };
    return (
        <div>
            <h1>Sign in</h1>
            {errorMessage && ( // Conditionally render error message if it exists
                <div>
                    {errorMessage}
                </div>
            )}
            <label for = "signin-username" className= "input-box"> Username:</label>
            <input name = "signin-username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <br/>
            <label for="signin-password"> Password:</label>
            <input name = "signin-password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <br/><br/>
            <Button  className="btn-secondary" onClick={signin}>Sign in</Button>
        </div>
    );
}
export default Signin;