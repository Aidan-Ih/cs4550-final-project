import { Link } from "react-router-dom";
function Site() {
    return (
        <div>
            {<h1>CS4550 Final Project</h1>}
            <Link to={`/SignIn`}>
                <button>Sign In</button>
            </Link>
            <Link to={`/SignUp`}>
                <button>Sign Up</button>
            </Link>
        </div>
    );
}

export default Site;