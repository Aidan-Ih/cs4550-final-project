import React from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router';
import "./index.css";
import { useState, useEffect } from "react";
import * as client from "./client";
import {Button} from "react-bootstrap";

function AdminSettings() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const findUserById = async (id) => {
        const thisUser = await client.findUserById(id);
        setUser(thisUser);
    };
    const deleteAccount = async (user) => {
        await client.deleteUser(user);
        navigate("/");
    }
    const makeAdmin = async (userData) => {
        const adminUser = { ...userData, role: "ADMIN" };
        await client.updateUser(adminUser, false);
        navigate(`/profile/${userData._id}`);
    }
    useEffect(() => {
        findUserById(id);
    }, []);
    return (
        <div className="container">
            <h1 className = "account-title">Account Settings</h1>
            {user &&
                <div>
                    <div className = "row admin-details">
                        <div className = "col-3 font-bold">
                            Username:
                        </div>
                        <div className = "col-3">
                            {user.username}
                        </div>
                    </div>
                    <div className = "row admin-details">
                        <div className = "col-3 font-bold">
                            First Name:
                        </div>
                        <div className = "col-3">
                            {user.firstName}
                        </div>
                    </div>

                    <div className = "row admin-details">
                        <div className = "col-3 font-bold">
                            Last Name:
                        </div>
                        <div className = "col-3">
                            {user.lastName}
                        </div>
                    </div>

                    <div className = "row admin-details">
                        <div className = "col-3 font-bold">
                            Phone:
                        </div>
                        <div className = "col-3">
                            {user.phone}
                        </div>
                    </div>

                    <div className = "row admin-details">
                        <div className = "col-3 font-bold">
                            Email:
                        </div>
                        <div className = "col-3">
                            {user.email}
                        </div>
                    </div>
                    <div className = "row admin-details">
                        <Button className = "btn-delete btn-width" onClick={() => deleteAccount(user)}>DELETE ACCOUNT</Button>
                        <Button className = "btn-admin btn-width" onClick={() => makeAdmin(user)}>Make Admin</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default AdminSettings;