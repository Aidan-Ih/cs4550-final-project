import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import "./Profile/style.css"
function Site() {
    return (
        <div>
            {<h1>CS4550 Final Project</h1>}
            {<h2>Login</h2>}
            <br/>

            <Link to={`/SignIn`}>
                <Button className="btn-signin">Sign In</Button>
            </Link>
            <Link to={`/SignUp`}>
                <Button className="btn-signin">Sign Up</Button>
            </Link>
        </div>
    );
}

export default Site;