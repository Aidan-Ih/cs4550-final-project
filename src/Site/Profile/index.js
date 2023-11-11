import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import profilePic from "./images/profilepic.png"
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "./profileReducer";

function Profile() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    // Extract ID from the last element in the path
    const pathList = pathname.split("/");
    var id = Number(pathList[2]);

    // Get users list from reducer state
    const users = useSelector((state) => state.profileReducer.users);
    const loggedInUser = users.find((u) => u.loggedIn);

    // If user id isn't in the path, set user to logged in user
    // if path length is 2 that means last element in path is /profile
    if (isNaN(id) && pathList.length === 2) {
        id = loggedInUser._id;
        // If path length isn't 2 and the last element is not a number, page is undefined
    } else if (isNaN(id)) {
        id = -1;
    }
    const user = users.find((u) => id === u._id);
    // If user is not found, page is undefined
    if (user === undefined) {
        id = -1;
    }

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
        dispatch(updateProfile(updatedUser));
        dispatch(updateProfile(updatedLoggedInUser));
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
        dispatch(updateProfile(updatedLoggedInUser));
        dispatch(updateProfile(updatedUser));
    }

    return (
        <div className="container">
            {/* If the id is -1, this page is undefined so show error */}
            {/* Else, display the user's profile */}
            {id === -1 ? (<h1>Profile not found</h1>) : (
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 profile-left">
                        <img className="profile-picture" src={profilePic} alt="Profile" />
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h3 className="profile-content">{user.username}</h3>
                        <div className="row profile-content">
                            <div className="col">
                                <Link to={`/profile/${id}/followers`}
                                    className="follow-link">
                                    Followers&nbsp;{user.followers.length}
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={`/profile/${id}/following`}
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
                        {user.loggedIn && <Link to={`/profile/edit-profile`}><button>Edit Profile</button></Link>}
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is following this user */}
                        {!user.loggedIn && user.followers.includes(loggedInUser._id) &&
                            <button onClick={() => { handleUnfollow(); }}>Unfollow</button>}
                        {/* Show this button only if this is NOT the profile of the logged in user and the logged in user is NOT following this user */}
                        {!user.loggedIn && !user.followers.includes(loggedInUser._id) &&
                            <button onClick={() => { handleFollow(); }}>Follow</button>}
                    </div>
                </div>)}
        </div>
    );
}

export default Profile;