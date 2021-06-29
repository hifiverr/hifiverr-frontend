// components/profile.js
import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile() {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
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
  );
}
