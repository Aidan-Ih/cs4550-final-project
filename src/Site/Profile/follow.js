import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import profilePic from "./images/profilepic.png"
import "./index.css";
import { useSelector } from "react-redux";

// Displays the followers or users following the current selected user, depending on the path
function Follow() {
    const { pathname } = useLocation();
    const pathList = pathname.split("/");

    // Get this user's ID from the path
    // This is whose followers/following we display
    const uid = Number(pathList[2]);
    const users = useSelector((state) => state.profileReducer.users);
    const user = users.find((u) => uid === u._id);
    // if the last element in the path is "followers", render the followers
    // Else, render the following list
    const followList = (pathList[3] === "followers") ? user.followers : user.following;
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-12 profile-left">
                    <img className="profile-picture" src={profilePic} alt="Profile" />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12">
                    <nav className="nav nav-pills nav-fill follow-top-bar">
                        <Link className={`nav-link ${pathname.includes("followers") && "active"}`} to={`/profile/${uid}/followers`}>
                            Followers
                        </Link>
                        <Link className={`nav-link ${pathname.includes("following") && "active"}`} to={`/profile/${uid}/following`}>
                            Following
                        </Link>
                        <Link className={`nav-link`} to={`/profile/${uid}`}>
                            Back
                        </Link>
                    </nav>
                    <div className="follow-list-container">
                        {followList.map((id) => (
                            <ul className="follow-list">
                                {users.find((u) => u._id === id) && (
                                    <li>
                                        <Link className="follow-link" to={`/profile/${id}`}>{users.find((u) => u._id === id).username}</Link>
                                    </li>
                                )}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Follow;