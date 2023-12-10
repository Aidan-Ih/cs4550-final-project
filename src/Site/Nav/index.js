import "./index.css"
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <div className="navbar-wrapper">
                <div className="left-links">
                    <Link to="/" className="navbar-link" href="#home">
                        <i class="fa-solid fa-house fa-2x nav-icon"></i>
                    </Link>
                    <Link to="/Search" className="navbar-link" href="#search">
                        <i class="fa-solid fa-magnifying-glass fa-2x nav-icon "></i>
                    </Link>
                </div>
                <Link to="Login" className="navbar-link" href="#profile">
                    <i class="fa-solid fa-user fa-2x nav-icon"></i>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;