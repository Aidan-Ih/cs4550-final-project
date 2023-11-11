import React from "react";
import { Link } from "react-router-dom";
import { updateProfile, setProfile } from "./profileReducer";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import profilePic from "./images/profilepic.png"

function ProfileEditor() {
    const user = useSelector((state) => state.profileReducer.user);
    const dispatch = useDispatch();
    return (
        <div className="container">
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
                            dispatch(setProfile({ ...user, username: e.target.value }))}
                        placeholder="Username" />
                    <h6>First Name</h6>
                    <input
                        value={user.firstName}
                        onChange={(e) =>
                            dispatch(setProfile({ ...user, firstName: e.target.value }))}
                        placeholder="First Name" />
                    <h6>Last Name</h6>
                    <input
                        value={user.lastName}
                        onChange={(e) =>
                            dispatch(setProfile({ ...user, lastName: e.target.value }))}
                        placeholder="Last Name" />
                    <h6>Bio</h6>
                    <textarea
                        value={user.bio}
                        onChange={(e) =>
                            dispatch(setProfile({ ...user, bio: e.target.value }))}
                        placeholder="Biography" />
                    <h6>Email</h6>
                    <input
                        value={user.email}
                        onChange={(e) =>
                            dispatch(setProfile({ ...user, email: e.target.value }))}
                        placeholder="Email" />
                    <h6>Phone</h6>
                    <input
                        value={user.phone}
                        onChange={(e) =>
                            dispatch(setProfile({ ...user, phone: e.target.value }))}
                        placeholder="Phone Number" />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <Link to={`/profile`}><button onClick={() => { dispatch(updateProfile(user)); }}>
                        Save
                    </button>
                    </Link>
                    <Link to={`/profile`}><button>Cancel</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditor;