import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import profilePic from "./images/profilepic.png"
import "./index.css";
import * as client from "./client";
import {Button} from "react-bootstrap";

// Displays the followers or users following the current selected user, depending on the path
function Follow() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { pathname } = useLocation();
    const pathList = pathname.split("/");
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    // This variable is true if the logged in user is viewing their own profile
    const [loggedIn, setLoggedIn] = useState(null);
    // This variable indicates if we are on the "followers" or "following" page
    const [page, setPage] = useState("");
    const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
    };
    const findUserById = async (id) => {
        const thisUser = await client.findUserById(id);
        setUser(thisUser);
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const navigateToFollowers = () => {
        if (loggedIn) {
            navigate("/profile/followers");
            setPage("followers");
        } else {
            navigate(`/profile/${id}/followers`);
            setPage("followers");
        }
    }
    const navigateToFollowing = () => {
        if (loggedIn) {
            navigate("/profile/following");
            setPage("following");
        } else {
            navigate(`/profile/${id}/following`);
            setPage("following");
        }
    }
    const navigateToProfile = () => {
        if (loggedIn) {
            navigate("/profile");
        } else {
            navigate(`/profile/${id}`)
        }
    }
    useEffect(() => {
        // If ID is included in the path, we are looking at another user's follow page
        // If ID is not in the path, this is the signed in user's follow page
        if (pathList.length === 4) {
            findUserById(id);
            setPage(pathList[3]);
            setLoggedIn(false);
        } else {
            fetchAccount();
            setPage(pathList[2]);
            setLoggedIn(true);
        }
        fetchUsers();
    }, []);
    return (
        <div className="container">
            {user && (
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 profile-left">
                        <img className="profile-picture" src={profilePic} alt="Profile" />
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12">
                        <nav className="nav nav-pills nav-fill follow-top-bar">
                            <Button className={`nav-link ${pathname.includes("followers") && "active"}`}
                                onClick={navigateToFollowers}>Followers</Button>
                            <Button className={`nav-link ${pathname.includes("following") && "active"}`}
                                onClick={navigateToFollowing}>Following</Button>
                            <Button className={`nav-link`}
                                onClick={navigateToProfile}>Back</Button>
                        </nav>
                        {page === "followers" && (<div className="follow-list-container">
                            {user.followers.map((id) => (
                                <ul className="follow-list">
                                    {users.find((u) => u._id === id) && (
                                        <li>
                                            <Link className="follow-link" to={`/profile/${id}`}>{users.find((u) => u._id === id).username}</Link>
                                        </li>
                                    )}
                                </ul>
                            ))}
                        </div>)}
                        {page === "following" && (<div className="follow-list-container">
                            {user.following.map((id) => (
                                <ul className="follow-list">
                                    {users.find((u) => u._id === id) && (
                                        <li>
                                            <Link className="follow-link" to={`/profile/${id}`}>{users.find((u) => u._id === id).username}</Link>
                                        </li>
                                    )}
                                </ul>
                            ))}
                        </div>)}
                    </div>
                </div>)}
        </div >
    );
}

export default Follow;