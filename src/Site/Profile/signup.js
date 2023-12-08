import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {Button, Form} from "react-bootstrap";
import "./style.css"

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

            <Form>
                <Form.Group className="mb-3 signin-box" controlId="signinUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="string" placeholder="Username"
                                  value = {credentials.username}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, username: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3 signin-box" controlId="signinPass">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  value = {credentials.password}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, password: e.target.value })}/>
                </Form.Group>
            </Form>

            <Button  className = "btn-signin" onClick={signup}>Sign Up</Button>
        </div>
    );
}
export default Signup;