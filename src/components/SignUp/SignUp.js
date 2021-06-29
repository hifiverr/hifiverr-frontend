import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import upload_image from "../assets/upload_image.svg";
import "./SignUp.css";

const SignUp = () => {
  const [state, setState] = React.useState({ profile_image: upload_image });
  const history = useHistory();
  const [isImageDisplayed, setIsImageDisplayed] = React.useState(false);

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
      <br />
      <form onSubmit={handleSubmit}>
        {isImageDisplayed ? (
          <div className="signup-header">
            <label htmlFor="image" className="profile_image_label">
              Upload Photo
            </label>
            <input
              name="profile_image"
              onChange={handleChange}
              className="profile-image-input"
            />
            <button
              onClick={() => setIsImageDisplayed(false)}
              className="upload_image_button"
            >
              Confirm
            </button>
          </div>
        ) : (
          <img
            src={state.profile_image}
            onClick={() => setIsImageDisplayed(true)}
            className="create_profile_image"
          />
        )}

        <br />
        <p className="labels_text">Email</p>
        <input
          name="email"
          value={state.email}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">Password</p>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">First Name</p>
        <input
          name="firstname"
          value={state.firstname}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">Last Name</p>
        <input
          name="lastname"
          value={state.lastname}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">Location</p>
        <input
          name="location"
          value={state.location}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">Language</p>
        <input
          name="primary_language"
          value={state.primary_language}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">Skills</p>
        <input
          name="skills"
          value={state.skills}
          onChange={handleChange}
          className="signup-input"
        />
        <br />
        <p className="labels_text">About Me</p>
        <input
          name="about_me"
          value={state.about_me}
          onChange={handleChange}
          className="aboutme-textarea"
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
