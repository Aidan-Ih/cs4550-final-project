import { Link } from "react-router-dom";
function Site() {
    return (
        <div>
            {<h1>CS4550 Final Project</h1>}
            <Link to={`/profile`}>
                <button>Profile</button>
            </Link>
        </div>
    );
}

export default Site;