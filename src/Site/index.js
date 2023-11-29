import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
function Site() {
    return (
        <div>
            {<h1>CS4550 Final Project</h1>}
            {<h1>Login</h1>}

            <Link to={`/SignIn`}>
                <Button className="btn-secondary">Sign In</Button>
            </Link>
            <Link to={`/SignUp`}>
                <Button className= "btn-secondary">Sign Up</Button>
            </Link>
        </div>
    );
}

export default Site;