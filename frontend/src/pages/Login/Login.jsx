
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const API_URL = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_URL}/api/auth`;

const Login = () => {
  const navigate = useNavigate();

  const [signState, setSignState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto redirect if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        signState === "Sign In" ? "login" : "register";
      //Payload = Data sent to backend.
      const payload =
        signState === "Sign In"
          ? { email, password }
          : { name, email, password };

      //Backend call
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",           //We are sending data
        headers: { "Content-Type": "application/json" },  //Tells backend: Data is in JSON format.
        body: JSON.stringify(payload) //Convert JS object → JSON string 
      });

      const data = await response.json(); //Convert JSON response → JS object

      if (!response.ok) { //Check if response is OK (200-299)
        alert(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token); //Save token in browser
      localStorage.setItem("user", JSON.stringify(data.user)); //Save user info in browser

      navigate("/"); //Go to home page

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }

    setLoading(false);
  };




  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="Netflix Logo" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{signState}</button>

          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?{" "}
                <span onClick={() => setSignState("Sign Up")}>
                  Sign up now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setSignState("Sign In")}>
                  Sign in
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



// This function handles both login and registration.
//  It prevents the default form submission and sends a POST request to either the login or register endpoint based on the state.
// I dynamically construct the payload and send it as JSON using fetch. After receiving the response,
// I convert it to JSON and check if the request was successful using response.ok. If successful,
// I store the authentication token and user data in localStorage and navigate to the home page.
// I also handle loading state and network errors properly using try-catch.