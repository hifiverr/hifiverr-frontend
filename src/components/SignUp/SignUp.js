import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./SignUp.css" ;

const SignUp = () => {
  const [state, setState] = React.useState({});
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/auth/register", state).then((response) => {
      history.push("/login");
    });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="signup-wrapper">
      <p className="h1-signup">Sign Up</p>
      <form onSubmit={handleSubmit}>
        <p>Image</p>
        <input
          name="profile_image"
          value={state.profile_image}
          onChange={handleChange}
          className="profile-image-input"
        />
        <br />
        <p>Email</p>
        <input
          name="email"
          value={state.email}
          onChange={handleChange}
          className="signup-email-input"
        />
        <br />
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          className="password-input"
        />
        <br />
        <p>First Name</p>
        <input
          name="firstname"
          value={state.firstname}
          onChange={handleChange}
          className="firstname-input"
        />
        <br />
        <p>Last Name</p>
        <input
          name="lastname"
          value={state.lastname}
          onChange={handleChange}
          className="lastname-input"
        />
        <br />
        <p>Location</p>
        <input
          name="location"
          value={state.location}
          onChange={handleChange}
          className="location-input"
        />
        <br />
        <p>Language</p>
        <input
          name="language"
          value={state.primary_language}
          onChange={handleChange}
          className="language-input"
        />
        <br />
        <p>Skills</p>
        <input
          name="skills"
          value={state.skills}
          onChange={handleChange}
          className="skill-input"
        />
        <br />
        <p>Interests</p>
        <input
          name="interests"
          value={state.Interests}
          onChange={handleChange}
          className="interests-input"
        />
        <br />
        <p>About Me</p>
        <input
          name="aboutme"
          value={state.aboutme}
          onChange={handleChange}
          className="aboutme-input"
        />
        <br />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
