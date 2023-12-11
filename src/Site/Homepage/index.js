import 'bootstrap/dist/css/bootstrap.min.css'
import { getRecentTournamentsQuery } from './requests';
import axios from 'axios'
import { useState } from 'react';
import "./index.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import * as client from "../Profile/client";
import { useDispatch } from "react-redux";
import { setLoggedInUser} from "../reducer";
import { useEffect } from "react";

function Homepage() {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const _loggedInUser = useSelector((state) => state.reducer.loggedInUser);
    const [loggedInUser, setLoggedInUser_] = useState(_loggedInUser);

    const getRecentEvents = async () => {
        const response = await axios.get("http://localhost:4000/getRecent");
        const data = response.data;
        setEvents(data);
        console.log(data);
    }
    const fetchAccount = async () => {
        const account = await client.account();
        setLoggedInUser_(account);
        dispatch(setLoggedInUser(account));
        console.log(account);
    };

    useEffect(() => {
        getRecentEvents(); // Fetch events when the component mounts
        fetchAccount();
      }, []);

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

    const saveUser = async (user) => {
        await client.updateUser(user);
        setLoggedInUser_(user);
        //navigate(`/profile/${id}`)
    };
    // Function to handle adding an event to favorites
    const addToFavorites = (eventId) => {
        const newFavsList = [eventId, ...loggedInUser.favoriteEvents];
        const updatedUser = {
            ...loggedInUser,
            favoriteEvents: newFavsList,
        };
        saveUser(updatedUser);
        dispatch(setLoggedInUser(updatedUser));
    };
    // Function to handle removing an event from favorites
    const removeFromFavorites = (eventId) => {
        const newFavsList = loggedInUser.favoriteEvents.filter((eid) => eid !== eventId);
        const updatedUser = {
            ...loggedInUser,
            favoriteEvents: newFavsList,
        };
        saveUser(updatedUser);
        dispatch(setLoggedInUser(updatedUser));
    };

    return (
        <div>
            {/* <h1>Homepage</h1> */}
            {loggedInUser && (
                <div>
                    <div>
                        <h3 className = "title">Hi, {loggedInUser.firstName}!</h3>
                        {loggedInUser.favoriteEvents.length > 0 && (
                            <div className= "user-content">
                                <h5 className= "text-center">Your Favorite Events:</h5>
                                {events
                                    .filter((event) => loggedInUser.favoriteEvents.includes(event.id))
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
                        )}
                        {loggedInUser.favoriteEvents.length === 0 && (
                            <h5 className = "text-center">No Events Favorited. Press the heart to favorite!</h5>
                        )}
                    </div>
                </div>)}

            <div className="anon-content">
                {/* <button className="btn btn-danger" onClick={getRecentEvents}>GET EVENTS</button> */}
                <h1 className = "title"> Upcoming Events</h1>
                <div className="list-group eventListContainer">
                    {events.map((e, i) => {
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
                                {/* Allow user to favorite event if they are logged in and have not faved this event yet */}
                                {loggedInUser && !loggedInUser.favoriteEvents.includes(e.id) && (
                                    <div>
                                        <button
                                            className="btn btn-sm favorite-btn"
                                            onClick={() => addToFavorites(e.id)}>
                                            <i className="fa-regular fa-heart fa-2x heart-empty"></i>
                                        </button>
                                    </div>
                                )}
                                {/* Allow user to unfavorite event if they are logged in and have faved this event already */}
                                {loggedInUser && loggedInUser.favoriteEvents.includes(e.id) && (
                                    <div>
                                        <button
                                            className="btn btn-sm favorite-btn"
                                            onClick={() => removeFromFavorites(e.id)}>
                                            <i className="fa-solid fa-heart heart-filled fa-2x"></i>
                                        </button>
                                    </div>
                                )}
                            </div>

                        )
                    })}


                </div>
            </div>

        </div>
    );
}

export default Homepage;