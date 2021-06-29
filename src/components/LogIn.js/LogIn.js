// components/login.js
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./LogIn.css";
import logo from "../assets/logo.svg";

function LogIn() {
  const [state, setState] = React.useState({});
  const { setUser, setAuth } = React.useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/auth/login", state).then((response) => {
      setUser(response.data.user);
      setAuth(true);
      Cookies.set("authToken", response.data.token);
      history.push(`/profile/${response.data.user.id}`);
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-inner-container">
          <img src={logo} alt="logo" className="login-logo" />
        </div>

        <form onSubmit={handleSubmit} className="login-profile-form">
          <p className="login-h1">Email</p>
          <input
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="email-input-form"
          />
          <br />
          <p className="login-h1">Password</p>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="**********"
            className="password-input-form"
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          {" "}
          Don´t have an account?<Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
