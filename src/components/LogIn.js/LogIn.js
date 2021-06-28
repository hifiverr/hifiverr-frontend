// components/login.js
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

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
      history.push("/profile");
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="email@example.com"
        />
        <br />
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="**********"
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        {" "}
        Don´t have an account?<Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
}

export default LogIn;
