import "./index.css"
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap";

function NavBar() {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.reducer.loggedInUser);
    return (
        <div>
            <div className="navbar-wrapper">
                <div className="left-links">
                    <Link to="/" className="navbar-link">
                        <i className="fa-solid fa-house fa-2x nav-icon"></i>
                    </Link>
                    <Link to="/Search" className="navbar-link">
                        <i className="fa-solid fa-magnifying-glass fa-2x nav-icon"></i>
                    </Link>
                </div>
                <Button onClick={() => {
                    if (loggedInUser != null) {
                        navigate("/Profile");
                    } else {
                        navigate("/Login");
                    }
                }}
                        className="btn-profile navbar-link" href="#profile">
                    <i className="fa-solid fa-user fa-2x nav-icon"></i>
                </Button>
            </div>
        </div>
    )
}

export default NavBar;