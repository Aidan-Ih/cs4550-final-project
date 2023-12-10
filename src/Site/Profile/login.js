import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";

function Login() {
    return(
        <div>
            <h1>Log In</h1>
            <Link to={`/SignIn`}>
                <button className="btn-signin">Sign In</button>
            </Link>
            <Link to={`/SignUp`}>
                <button className="btn-signin">Sign Up</button>
            </Link>
        </div>
    );
}

export default Login;