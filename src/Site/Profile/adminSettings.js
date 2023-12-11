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
    const makeAdmin = async (user) => {
        setUser({ ...user, role: "ADMIN" });
        await client.updateUser(user, false);
        navigate(`/profile/${user._id}`);
    }
    useEffect(() => {
        findUserById(id);
        console.log(user);
    }, []);
    return (
        <div>
            <h1 className = "account-title">Account Settings</h1>
            {user &&
                // <div className = "admin-details">
                //     <div className = "admin-details"> <span className = "font-bold"> Username:</span> {user.username}</div>
                //     <div> <span className = "font-bold"> First Name: </span>  {user.firstName}</div>
                //     <div> <span className = "font-bold"> Last Name:</span>  {user.lastName}</div>
                //     <div> <span className = "font-bold"> Phone:</span>  {user.phone}</div>
                //     <div> <span className = "font-bold"> Email: </span> {user.email}</div>
                // </div> &&
                //
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