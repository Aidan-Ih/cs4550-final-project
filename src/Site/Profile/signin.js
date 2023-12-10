import * as client from "./client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./style.css"
import {
    setLoggedInUser
} from "../reducer";
import { useDispatch } from "react-redux";
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {
        try { 
            const account = await client.signin(credentials);
            // set the logged in user
            dispatch(setLoggedInUser(account));
            navigate("/");
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
            <Form>
                <Form.Group className="mb-3 signin-box" controlId="signinUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="string" placeholder="Username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3 signin-box" controlId="signinPass">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })} />
                </Form.Group>
            </Form>

            <Button className="btn-signin" onClick={signin}>Sign in</Button>
        </div>
    );
}
export default Signin;