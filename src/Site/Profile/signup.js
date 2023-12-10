import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {Button, Form} from "react-bootstrap";
import "./style.css"

function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
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
    const isFormValid = () => {
        return (
            credentials.username &&
            credentials.password &&
            credentials.firstName &&
            credentials.lastName &&
            credentials.email &&
            credentials.phone
        );
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
                <Form.Group className="mb-3 signin-box" controlId="signinFirstName">
                    <Form.Label> First Name </Form.Label>
                    <Form.Control type="firstName" placeholder="First Name"
                                  value = {credentials.firstName}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, firstName: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3 signin-box" controlId="signinLastName">
                    <Form.Label> Last Name </Form.Label>
                    <Form.Control type="lastName" placeholder="LastName"
                                  value = {credentials.lastName}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, lastName: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3 signin-box" controlId="signinEmail">
                    <Form.Label> Email </Form.Label>
                    <Form.Control type="email" placeholder="Email"
                                  value = {credentials.email}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, email: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3 signin-box" controlId="signinPhone">
                    <Form.Label> Phone Number </Form.Label>
                    <Form.Control type="phone" placeholder="Phone Number"
                                  value = {credentials.phone}
                                  onChange={(e) =>
                                      setCredentials({ ...credentials, phone: e.target.value })}/>
                </Form.Group>
            </Form>

            <Button  className = "btn-signin" onClick={signup} disabled={!isFormValid()}>Sign Up</Button>
        </div>
    );
}
export default Signup;