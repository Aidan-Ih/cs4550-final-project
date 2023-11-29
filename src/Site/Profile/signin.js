import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate("/profile");
          } catch (error) {
            if (error.response && error.response.status === 401) {
              console.error('Incorrect Login Information');
              setErrorMessage('Incorrect Login Information');
            } else {
              console.error('An error occurred:', error.message);
              setErrorMessage('An error occurred: ' + error.message);
            }
          }
    };
    return (
        <div>
            <h1>Signin</h1>
            {errorMessage && ( // Conditionally render error message if it exists
                <div>
                    {errorMessage}
                </div>
            )}
            <input value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={signin}> Signin </button>
        </div>
    );
}
export default Signin;