import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./details.css"
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import * as userClient from "../Profile/client";
import { findCommentsForEvent, createComment, updateComment, deleteComment } from "./client";
import { findAllUsers } from "../Profile/client";
import { Link } from 'react-router-dom';
import { setLoggedInUser} from "../reducer";
import {Button, Form} from "react-bootstrap";

function Details() {
    const [event, setEvent] = useState({
        images: [{ type: "profile", url: "" }],
        events: []
    });
    const { tournamentId } = useParams();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ eventId: tournamentId });
    const [users, setUsers] = useState([])
    const _loggedInUser = useSelector((state) => state.reducer.loggedInUser);
    const [loggedInUser, setLoggedInUser_] = useState(_loggedInUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAccount = async () => {
        const account = await userClient.account();
        setLoggedInUser_(account);
        dispatch(setLoggedInUser(account));
    };

    const getEventById = async () => {
        const response = await axios.get(`http://localhost:4000/getEvent/${tournamentId}`)
        const data = response.data[0]
        setEvent(data)
        //console.log(data)
    }

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

    const getEntrants = (events) => {
        //console.log(events);
        var entrants = []
    }

    const getComments = async () => {
        const comments = await client.findCommentsForEvent(tournamentId);
        setComments(comments);
    }
    const findUsers = async () => {
        const users = await userClient.findAllUsers();
        setUsers(users);
    }
    const createComment = async (eventId, commentData) => {
        try {
            const newComment = await client.createComment(eventId, commentData);
            // Update comments state with the new comment
            setComments(prevComments => [...prevComments, newComment]);
            setComment(prevComment => ({ ...prevComment, comment: '' }));
        } catch (error) {
            // Handle error if comment creation fails
            console.error("Error creating comment:", error);
        }
    };
    const navigateToProfile = (uid) => {
        if (loggedInUser) {
            navigate(`/profile/${uid}`);
        } else {
            navigate("/login");
        }
    } 
    const deleteComment = async (commentId) => {
        await client.deleteComment(commentId);
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    }
    const [editedComment, setEditedComment] = useState({});

    const updateComment = async () => {
        try {
            await client.updateComment(editedComment);
            // Find the index of the edited comment in the state
            const index = comments.findIndex(comment => comment._id === editedComment._id);
            // Update the comment in the state
            if (index !== -1) {
                const updatedComments = [...comments];
                updatedComments[index] = editedComment;
                setComments(updatedComments);
                setEditedComment({}); // Reset edited comment
            }
        } catch (error) {
            // Handle error if comment update fails
            console.error("Error updating comment:", error);
        }
    };


    useEffect(() => {
        getEventById();
        getComments();
        findUsers();
        fetchAccount();
    }, [tournamentId]);

    return (
        <div>
            {/*<h1>Details</h1>*/}
            {/* <div>
                <button className="btn btn-danger" onClick={getEventById}>GET EVENT</button>
            </div> */}
            <div>

                <div className = "title">{event.name}</div>
                <div className = "row event-details">
                    <div className = "col-3">
                        <img className="event-profile-image"
                             src={event.images.find((i) => i.type === "profile").url}></img>
                    </div>
                    <div className="col-5 list-group">
                        <div className="list-group-item">
                            <i className="fa-solid fa-location-dot"></i>{event.venueAddress}
                        </div>
                        <div className="list-group-item">
                            <i className="fa-solid fa-calendar"></i> {getDateFromUnix(event.startAt)}
                        </div>
                        <div className="list-group-item">
                            <div >
                                <h2>Events:</h2>

                                {event.events.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            {e.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="list-group-item">
                            <h2>Entrants:</h2>
                            {getEntrants(event.events)}
                        </div>
                        <div className="list-group-item">
                            <h2>Comments:</h2>
                            {/* only admins can leave comments */}
                            {loggedInUser && loggedInUser.role === "ADMIN" && (
                                <div>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formComment">
                                            <Form.Control type="textera"
                                                          value = {comment.comment}
                                                          onChange={(e) =>
                                                              setComment({ ...comment, comment: e.target.value, userID: loggedInUser._id })}/>
                                        </Form.Group>
                                    </Form>

                                    <Button className = "btn-post" onClick={() => { createComment(tournamentId, comment) }}>Post</Button>
                                    <span><br/><br/></span>
                                </div>
                            )}
                            {comments.length > 0 && (
                                <ul>
                                    {comments.map((commentItem, index) => {
                                        const user = users.find(user => user._id === commentItem.userId);
                                        const username = user ? user.username : 'Unknown User';
                                        const isEditing = editedComment._id === commentItem._id;

                                        return (
                                            <div key={index}>
                                                <div className="flex-row d-flex comment-text">
                                                    <div onClick={() => navigateToProfile(commentItem.userId)}>
                                                        <i className="fa-solid fa-user"></i> {username}
                                                    </div>: {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editedComment.comment}
                                                        onChange={(e) => setEditedComment({ ...editedComment, comment: e.target.value })}
                                                    />
                                                ) : (
                                                    commentItem.comment
                                                )}
                                                    {loggedInUser && loggedInUser._id === commentItem.userId && (
                                                        <div>
                                                            {isEditing ? (
                                                                <Button onClick={updateComment}>
                                                                    Save
                                                                </Button>
                                                            ) : (
                                                                <Button className = "btn-edit" onClick={() => setEditedComment(commentItem)}>
                                                                    Edit
                                                                </Button>
                                                            )}
                                                            <Button className = "btn-delete" onClick={() => deleteComment(commentItem._id)}>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                        </div>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default Details;