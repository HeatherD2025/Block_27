import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validateValues = (inputValues) => {
    let errors = {};
    if (username.length < 5) {
      errors.username = "Username is too short";
    }
    if (password.length < 8) {
      errors.password = "Password is too short";
    }
    return errors;
  };

  const handleChange = (e) => {
    setUsername, setPassword({ [e.target.username]: e.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(validateValues(username, password));
    setSubmitting(true);
    try {
      const formData = {
        username,
        password,
      };
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      setToken(result.token);
      return result, setSuccessMessage(result.message);
    } catch (error) {
      console.error(error);
    }
  }

  const finishSubmit = () => {
    console.log(username, password);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      <div className="formContainer">
        <h2>Sign Up</h2>
        {successMessage && (
          <p>
            {successMessage} Welcome {username}!
          </p>
        )}
        {error && <p>{error}</p>}
        {Object.keys(errors).length === 0 && submitting ? (
          <span className="success">Successfully submitted ✓</span>
        ) : null}

        <form method="POST" onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                {
                  handleChange;
                }
              }}
            />
            {errors.username ? (
              <p className="error">
                Username should be at least 6 characters long
              </p>
            ) : null}
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                {
                  handleChange;
                }
              }}
            />
            {errors.password ? (
              <p className="error">
                Password should be at least 5 characters long
              </p>
            ) : null}
          </label>
          <button type="submit" className="btn btn-outline-success">
            submit
          </button>
        </form>
      </div>
    </>
  );
}
