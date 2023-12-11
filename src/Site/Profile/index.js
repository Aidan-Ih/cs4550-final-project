import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "./client";
import { Button } from "react-bootstrap";
import {
    setLoggedInUser
} from "../reducer";
import { useDispatch } from "react-redux";
import axios from 'axios'

function Profile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loggedInUser, setLoggedInUser_] = useState(null);
    const navigate = useNavigate();
    const API_BASE = process.env.REACT_APP_API_BASE;
    const refreshPage = () => {
        window.location.reload();
    }
    const findUserById = async (id) => {
        const thisUser = await client.findUserById(id);
        setUser(thisUser);
    };
    const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
        setLoggedInUser_(account);
        dispatch(setLoggedInUser(account));
    };
    const signout = async () => {
        await client.signout();
        navigate("/");
        dispatch(setLoggedInUser(null));
        refreshPage();
    };
    const fetchLoggedInUser = async () => {
        const account = await client.loggedInUser();
        setLoggedInUser_(account);
        dispatch(setLoggedInUser(account));
    }
    // Events
    const [events, setEvents] = useState([]);
    const convertDay = (num) => {
        switch (num) {
            case 0: return "Sunday"
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
            default: break
        }
    }
    const getDateFromUnix = (timestamp) => {
        const d = new Date(timestamp * 1000)
        const date = d.getDate()
        const month = d.getMonth()
        const day = convertDay(d.getDay())
        var formatted = day + ", " + month + "/" + date
        return formatted
    }
    const getRecentEvents = async () => {
        const response = await axios.get(`${API_BASE}/getRecent`);
        const data = response.data;
        setEvents(data);
    }
    useEffect(() => {
        if (id) {
            findUserById(id);
            fetchLoggedInUser();
        } else {
            fetchAccount();
        }
        getRecentEvents();
    }, [id]);
    const saveUser = async (user, thisUser) => {
        await client.updateUser(user, thisUser);
        //navigate(`/profile/${id}`)
    };
    // Handles unfollowing this user
    // Removes the logged in user's ID from the follower list of this user
    // Removes this user's ID from the following list of the logged in user
    const handleUnfollow = () => {
        // Check if loggedInUser is not in the followers list
        const isNotFollowing = !user.followers.includes(loggedInUser._id);
        if (isNotFollowing) {
            // If loggedInUser is not a follower, don't proceed further
            return;
        }
    
        // // Check if user is in the following list of loggedInUser
        // const isFollowing = loggedInUser.following.includes(user._id.toString());
        // if (isFollowing) {
        //     console.log(loggedInUser);
        //     console.log(user._id);
        //     console.log(loggedInUser.following);
        //     console.log("logged in user is not following this user")
        //     // If loggedInUser is not following the user, don't proceed further
        //     return;
        // }
    
        // If both are following each other, update the lists
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
    
        // Update users
        saveUser(updatedUser, false);
        saveUser(updatedLoggedInUser, true);
        setUser(updatedUser);
        setLoggedInUser_(updatedLoggedInUser);
        dispatch(setLoggedInUser(updatedLoggedInUser));
    };

    // Handles following this user
    // Adds the logged in user's ID to the follower list of this user
    // Adds this user's ID to the following list of the logged in user
    const handleFollow = () => {
        // // Check if loggedInUser is already following the user
        // const isAlreadyFollowing = loggedInUser.following.includes(user._id);
        // if (isAlreadyFollowing) {
        //     // If already following, don't proceed further
        //     return;
        // }
    
        // Check if user is already in the followers list
        const isAlreadyFollower = user.followers.includes(loggedInUser._id);
        if (isAlreadyFollower) {
            // If already a follower, don't proceed further
            return;
        }
    
        // If not already following or follower, update the lists
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
    
        // Update users
        saveUser(updatedUser, false);
        saveUser(updatedLoggedInUser, true);
        setUser(updatedUser);
        setLoggedInUser_(updatedLoggedInUser);
        dispatch(setLoggedInUser(updatedLoggedInUser));
    };

    return (
        <div className="container">
            {user && loggedInUser && (
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <div className="row">
                            <div className="col">
                                <h2 className=" profile-content"> {user.firstName}&nbsp;{user.lastName}</h2>
                                <h4 className=" profile-content"> {user.username}</h4>
                            </div>

                            <div className="col">
                                {/* Show this button only if this is the profile of the logged in user */}
                                {loggedInUser._id === user._id && <div>
                                    <Link to={`/profile/edit-profile`}>
                                        <Button className="btn-edit">Edit Profile</Button>
                                    </Link>
                                    <Button className="btn-signout" onClick={signout}>Sign Out</Button>
                                </div>}
                            </div>

                        </div>

                        <div className="row profile-content">
                            <div className="col">
                                <Link to={`followers`}
                                    className="follow-link">
                                    Followers:&nbsp;{user.followers.length}
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={`following`}
                                    className="follow-link">
                                    Following:&nbsp;{user.following.length}
                                </Link>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="bio text-break">
                                <h5>{user.bio} </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is following this user */}
                        {loggedInUser._id !== user._id && user.followers.includes(loggedInUser._id) &&
                            <Button onClick={() => { handleUnfollow(); }}>Unfollow</Button>}
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is NOT following this user */}
                        {loggedInUser._id !== user._id && !user.followers.includes(loggedInUser._id) &&
                            <Button onClick={() => { handleFollow(); }}>Follow</Button>}
                        {loggedInUser._id !== user._id && loggedInUser.role === "ADMIN" &&
                            <Link to="settings">
                                <Button>Admin Settings</Button>
                            </Link>}
                    </div>
                    <div>
                        <h4>Favorites</h4>
                        {events
                            .filter((event) => user.favoriteEvents.includes(event.id))
                            .map((e, i) => {
                                return (
                                    <div className="list-group-item eventListItem d-flex flex-row justify-content-between" key={e.id}>
                                        <div className="d-flex flex-row">
                                            <img className="eventListItemPic"
                                                src={e.images.find((i) => i.type === "profile").url}></img>
                                            <div className="tournament-info-container">
                                                <Link to={`/Details/${e.id}`}> <b className="tournament-title"> {e.name}</b> </Link>
                                                <div>{getDateFromUnix(e.startAt)}</div>
                                                <div>{e.city}, MA</div>
                                                <div>ID: {e.id}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>)}
        </div>
    );
}

export default Profile;