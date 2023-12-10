import React from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router';
import "./style.css";
import { useState, useEffect } from "react";
import * as client from "./client";

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
            <h1>Admin Settings</h1>
            {user &&
                <div>
                    <div>Username: {user.username}</div>
                    <div>First Name: {user.firstName}</div>
                    <div>Last Name: {user.lastName}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Email: {user.email}</div>
                    <button onClick={() => deleteAccount(user)}>DELETE ACCOUNT</button>
                    <button onClick={() => makeAdmin(user)}>Make Admin</button>
                </div>
            }
        </div>
    );
}

export default AdminSettings;