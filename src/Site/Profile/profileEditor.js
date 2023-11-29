import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import * as client from "./client";
import profilePic from "./images/profilepic.png"

function ProfileEditor() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
    };
    const save = async () => {
        await client.updateUser(user);
        navigate("/profile");
    };
    useEffect(() => {
        fetchAccount();
    }, []);
    return (
        <div className="container">
            {user && (
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 profile-left">
                        <img className="profile-picture" src={profilePic} alt="Profile" />
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h3>Edit Profile</h3>
                        <h6>Username</h6>
                        <input
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })}
                            placeholder="Username" />
                        <h6>Password</h6>
                        <input
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })}
                            placeholder="Password" />
                        <h6>First Name</h6>
                        <input
                            value={user.firstName}
                            onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })}
                            placeholder="First Name" />
                        <h6>Last Name</h6>
                        <input
                            value={user.lastName}
                            onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })}
                            placeholder="Last Name" />
                        <h6>Bio</h6>
                        <textarea
                            value={user.bio}
                            onChange={(e) =>
                                setUser({ ...user, bio: e.target.value })}
                            placeholder="Biography" />
                        <h6>Email</h6>
                        <input
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })}
                            placeholder="Email" />
                        <h6>Phone</h6>
                        <input
                            value={user.phone}
                            onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })}
                            placeholder="Phone Number" />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <button onClick={save}>
                            Save
                        </button>
                        <Link to={`/profile`}><button>Cancel</button></Link>
                    </div>
                </div>)}
        </div>
    );
}

export default ProfileEditor;