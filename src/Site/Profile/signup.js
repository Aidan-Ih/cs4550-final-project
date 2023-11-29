import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {Button} from "react-bootstrap";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/Profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Sign up</h1>
            {error && <div>{error}</div>}

            <label htmlFor="signup-username" className="input-box"> Username:</label>
            <input
                name = "signup-username"
                value={credentials.username}
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })} />
            <br/>

            <label htmlFor="signup-password"> Password:</label>
            <input
                name = "signup-password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />
            <br/><br/>
            <Button  className = "btn-secondary" onClick={signup}>Sign Up</Button>
        </div>
    );
}
export default Signup;