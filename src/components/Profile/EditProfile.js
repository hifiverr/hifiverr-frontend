import axios from "axios";
import React, { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
//import { user } from "../../Context/AuthContext";

const EditProfile = ({ routerId }) => {
  const { user, setUser } = React.useContext(AuthContext);

  const [editProfile, setEditProfile] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    skills: user.skills,
    location: user.location,
    primary_language: user.primary_language,
    profile_image: user.profile_image,
    about_me: user.about_me,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/users/${routerId}`, editProfile).then((response) => {
      setUser(response.data.user);
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            name="firstname"
            value={editProfile.firstname}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lastname">Last name</label>
          <input
            id="lastname"
            name="lastname"
            value={editProfile.lastname}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={editProfile.location}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="primary_language">Language</label>
          <input
            id="primary_language"
            name="primary_language"
            value={editProfile.primary_language}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="skills">Skills</label>
          <input
            id="skills"
            name="skills"
            value={editProfile.skills}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="about_me">Skills</label>
          <input
            id="about_me"
            name="about_me"
            value={editProfile.about_me}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Cancel</button>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
