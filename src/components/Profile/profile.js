// components/profile.js
import React, { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import EditProfile from "./EditProfile";
import edit_profile from "../assets/edit_profile.svg";
const Profile = ({ match }) => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  const [isUserInEditMode, setIsUserInEditMode] = useState(false);

  const routerId = match.params.id;

  return (
    <div>
      {isUserInEditMode ? (
        <EditProfile routerId={routerId} />
      ) : (
        <div>
          {routerId === user.id ? <img src={edit_profile} /> : null}
          <img src={user.profile_image} alt="" />
          <p>
            {user.firstname} {user.lastname}
          </p>
          <br />
          <p>{user.location}</p>
          <br />
          <p>Language:{user.primary_language}</p>
          <br />
          <p>Skills:{user.skills}</p>
          <br />
          <p>About me:</p>
          <p>{user.about_me}</p>
          <button
            onClick={() => {
              Cookies.remove("authToken");
              history.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
