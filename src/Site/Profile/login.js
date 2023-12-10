import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import {Button} from "react-bootstrap";

function Login() {
    return(
        <div>
            <Link to={`/SignIn`}>
                <Button className="btn-signin">Sign In</Button>
            </Link>
            <Link to={`/SignUp`}>
                <Button className="btn-signin">Sign Up</Button>
            </Link>
        </div>
    );
}

export default Login;