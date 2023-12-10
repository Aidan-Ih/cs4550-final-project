import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import * as client from "./client";
import {Button, Form} from "react-bootstrap";

function ProfileEditor() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
    };
    const save = async () => {
        await client.updateUser(user, true);
        navigate("/profile");
    };
    useEffect(() => {
        fetchAccount();
    }, []);
    return (
        <div className="container">
            {user && (
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h3>Edit Profile</h3>

                        <Form>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="string" placeholder="Username"
                                              value = {user.username}
                                              onChange={(e) =>
                                                  setUser({ ...user, username: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              value = {user.password}
                                              onChange={(e) =>
                                                  setUser({ ...user, password: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label> First Name </Form.Label>
                                <Form.Control type="string" placeholder="First name"
                                              value = {user.firstName}
                                              onChange={(e) =>
                                                  setUser({ ...user, firstName: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label> Last Name </Form.Label>
                                <Form.Control type="string" placeholder="Last Name"
                                              value = {user.lastName}
                                              onChange={(e) =>
                                                  setUser({ ...user, lastName: e.target.value })}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="email" placeholder="Email"
                                              value = {user.email}
                                              onChange={(e) =>
                                                  setUser({ ...user, email: e.target.value })}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label> Phone Number </Form.Label>
                                <Form.Control type="string" placeholder="Last Name"
                                              value = {user.phone}
                                              onChange={(e) =>
                                                  setUser({ ...user, phone: e.target.value })}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBio">
                                <Form.Label> Bio </Form.Label>
                                <Form.Control type="textera" placeholder="Bio"
                                              value = {user.bio}
                                              onChange={(e) =>
                                                  setUser({ ...user, bio: e.target.value })}/>
                            </Form.Group>
                        </Form>

                        <br/><br/>
                        <Button onClick={save} className="btn-save"> Save </Button>
                        <Link to="/profile"><Button className = "btn-signout">Cancel</Button></Link>

                    </div>
                </div>)}
        </div>
    );
}

export default ProfileEditor;