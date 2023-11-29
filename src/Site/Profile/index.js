import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import profilePic from "./images/profilepic.png"
import * as client from "./client";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    // This variable is true if the logged in user is viewing their own profile
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();
    const findUserById = async (id) => {
        const thisUser = await client.findUserById(id);
        setUser(thisUser);
    };
    const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
        setLoggedInUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/SignIn");
    };
    const fetchLoggedInUser = async () => {
        const account = await client.loggedInUser();
        setLoggedInUser(account);
    }
    useEffect(() => {
        if (id) {
            findUserById(id);
            fetchLoggedInUser();
        } else {
            fetchAccount();
        }
    }, []);
    const saveUser = async (user) => {
        await client.updateUser(user);
        navigate(`/profile/${id}`)
    };
    // Handles unfollowing this user
    // Removes the logged in user's ID from the follower list of this user
    // Removes this user's ID from the following list of the logged in user
    const handleUnfollow = () => {
        const newFollowerList = user.followers.filter((uid) => uid !== loggedInUser._id);
        const newFollowingList = loggedInUser.following.filter((uid) => uid !== user._id);
        const updatedUser = {
            ...user,
            followers: newFollowerList,
        };
        const updatedLoggedInUser = {
            ...loggedInUser,
            following: newFollowingList,
        };
        saveUser(updatedUser);
        saveUser(updatedLoggedInUser);
        setUser(updatedUser);
        setLoggedInUser(updatedLoggedInUser);
    }

    // Handles following this user
    // Adds the logged in user's ID to the follower list of this user
    // Adds this user's ID to the following list of the logged in user
    const handleFollow = () => {
        const newFollowerList = [loggedInUser._id, ...user.followers];
        const newFollowingList = [user._id, ...loggedInUser.following];
        const updatedLoggedInUser = {
            ...loggedInUser,
            following: newFollowingList,
        };
        const updatedUser = {
            ...user,
            followers: newFollowerList,
        };
        saveUser(updatedUser);
        saveUser(updatedLoggedInUser);
        setUser(updatedUser);
        setLoggedInUser(updatedLoggedInUser);
    }

    return (
        <div className="container">
            {user && loggedInUser && (
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 profile-left">
                        <img className="profile-picture" src={profilePic} alt="Profile" />
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h3 className="profile-content">{user.username}</h3>
                        <div className="row profile-content">
                            <div className="col">
                                <Link to={`followers`}
                                    className="follow-link">
                                    Followers&nbsp;{user.followers.length}
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={`following`}
                                    className="follow-link">
                                    Following&nbsp;{user.following.length}
                                </Link>
                            </div>
                        </div>
                        <div className="profile-content">
                            <h4>Name:</h4>
                            <div className="name">{user.firstName}&nbsp;{user.lastName}</div>
                        </div>
                        <div className="profile-content">
                            <h4>Biography:</h4>
                            <div className="bio text-break">{user.bio}</div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        {/* Show this button only if this is the profile of the logged in user */}
                        {loggedInUser._id === user._id && <div>
                            <Link to={`/profile/edit-profile`}><button>Edit Profile</button></Link>
                            <button onClick={signout}>Sign Out</button>
                        </div>}
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is following this user */}
                        {loggedInUser._id !== user._id && user.followers.includes(loggedInUser._id) &&
                            <button onClick={() => { handleUnfollow(); }}>Unfollow</button>}
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is NOT following this user */}
                        {loggedInUser._id !== user._id && !user.followers.includes(loggedInUser._id) &&
                            <button onClick={() => { handleFollow(); }}>Follow</button>}
                    </div>
                </div>)}
        </div>
    );
}

export default Profile;