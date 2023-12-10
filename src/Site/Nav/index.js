import "./index.css"
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.reducer.loggedInUser);
    return (
        <div>
            <div className="navbar-wrapper">
                <div className="left-links">
                    <Link to="/" className="navbar-link">
                        <i className="fa-solid fa-house"></i>
                    </Link>
                    <Link to="/Search" className="navbar-link">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                </div>
                <button onClick={() => {
                    if (loggedInUser != null) {
                        navigate("/Profile");
                    } else {
                        navigate("/Login");
                    }
                }}
                    className="navbar-link" href="#profile">
                    <i className="fa-solid fa-user"></i>
                </button>
            </div>
        </div>
    )
}

export default NavBar;