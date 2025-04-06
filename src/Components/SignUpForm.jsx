import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUpForm ({token, setToken}) {
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState (null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
      });

async function handleSubmit(event) {
        event.preventDefault();
    try {
        const formData = {
            username,
            password,
        };
        const response= await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result=await response.json();
        setToken(result.token);
        return result, setSuccessMessage(result.message);
        } catch(error) {
            console.error(error);
        }
      }
return (
    <>
        <div className="formContainer">
            <h2>Sign Up</h2>
            {successMessage && <p>{successMessage} Welcome {username}!</p>}
            {error && <p>{error}</p>}

            <form method="POST" onSubmit={handleSubmit} >
                <label>
                    Username: <input 
                        value={username}
                        onChange={((e) => {
                            setUsername(e.target.value);
                        })}/>
                </label>
                <label>
                    Password: <input 
                        value={password}
                        onChange={((e) => {
                            setPassword(e.target.value);
                        })}/>
                </label>
                <button className="btn btn-outline-success">submit</button>
            </form>
        </div>
    </>
)
}
