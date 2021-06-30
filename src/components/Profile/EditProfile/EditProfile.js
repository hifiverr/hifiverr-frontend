import axios from "axios";
import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import "./EditProfile.css";

const EditProfile = ({ routerId, setIsUserInEditMode }) => {
  //const history = useHistory();

  const { user, setUser } = React.useContext(AuthContext);

  const [editProfile, setEditProfile] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    location: user.location,
    primary_language: user.primary_language,
    profile_image: user.profile_image,
    about_me: user.about_me,
    skills: user.skills,
  });
  const [isImageDisplayed, setIsImageDisplayed] = React.useState(false);

  // React.useEffect(() => {
  //   setEditProfile(user);
  // }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/users/${routerId}`, editProfile).then((response) => {
      setUser(response.data);
      setEditProfile(response.data);
    });
    setIsUserInEditMode(false);
  };

  return (
    <div className="edit-profile-wrapper">
      <h1 className="edit-profile-header">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "50px" }}>
          {isImageDisplayed ? (
            <div className="signup-header">
              <label htmlFor="image" className="profile_image_label">
                Change Photo
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
              src={editProfile.profile_image}
              onClick={() => setIsImageDisplayed(true)}
              className="create_profile_image"
            />
          )}
        </div>

        <label className="labels_text" htmlFor="firstname">
          First name
        </label>
        <input
          className="edit-profile-input"
          id="firstname"
          name="firstname"
          value={editProfile.firstname}
          onChange={handleChange}
        />
        <br />
        <label className="labels_text" htmlFor="lastname">
          Last name
        </label>
        <input
          className="edit-profile-input"
          id="lastname"
          name="lastname"
          value={editProfile.lastname}
          onChange={handleChange}
        />
        <br />
        <label className="labels_text" htmlFor="location">
          Location
        </label>
        <input
          className="edit-profile-input"
          id="location"
          name="location"
          value={editProfile.location}
          onChange={handleChange}
        />
        <br />
        <label className="labels_text" htmlFor="primary_language">
          Language
        </label>
        <input
          className="edit-profile-input"
          id="primary_language"
          name="primary_language"
          value={editProfile.primary_language}
          onChange={handleChange}
        />
        <br />
        <label className="labels_text" htmlFor="skills">
          Skills
        </label>
        <input
          className="edit-profile-input"
          id="skills"
          name="skills"
          value={editProfile.skills}
          onChange={handleChange}
        />
        <br />
        <label className="labels_text" htmlFor="about_me">
          About me
        </label>
        <textarea
          className="aboutme-textarea"
          id="about_me"
          name="about_me"
          value={editProfile.about_me}
          onChange={handleChange}
        />
        <br />

        <div className="button-container">
          <button
            className="edit-profile-button  edit-profile-button-cancel"
            type="button"
            onClick={() => setIsUserInEditMode(false)}
          >
            Cancel
          </button>
          <button
            className="edit-profile-button  edit-profile-button-success"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
