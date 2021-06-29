// components/profile.js
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import EditProfile from "./EditProfile";
import edit_profile from "../assets/edit_profile.svg";
import axios from "axios";
import Header from "../Header/Header";
const Profile = ({ match }) => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  const [isUserInEditMode, setIsUserInEditMode] = useState(false);
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);
  const [isGuestProfile, setIsGuestProfile] = useState(false);
  const [guestInfo, setGuestInfo] = useState({});

  const routerId = Number(match.params.id);
  // console.log("router id", routerId);
  // console.log("user id", user.id);

  useEffect(() => {
    console.log(user);
    // checking for guest profile
    if (routerId != user.id && user.id !== undefined) {
      console.log("guest");
      setIsPopupDisplayed(false);
      setIsUserInEditMode(false);
      setIsGuestProfile(true);
      fetchGuestUser(routerId);
    }
  }, [user]);

  const fetchGuestUser = (guestId) => {
    axios
      .get(`/users/${guestId}`)
      .then((response) => setGuestInfo(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* displayin popup  */}
      {isPopupDisplayed ? (
        <div>
          <button onClick={() => setIsPopupDisplayed(false)}>X</button>
          <h2>
            {guestInfo.firstname} {guestInfo.lastname}
          </h2>
          <h4>{guestInfo.email}</h4>
        </div>
      ) : null}
      {/* is in edit mode  */}
      <Header />
      {isUserInEditMode ? (
        <EditProfile
          routerId={routerId}
          setIsUserInEditMode={setIsUserInEditMode}
        />
      ) : (
        <div>
          {/* button edit profile  */}
          {routerId === user.id ? (
            <img src={edit_profile} onClick={() => setIsUserInEditMode(true)} />
          ) : null}

          {isGuestProfile ? (
            <img src={guestInfo.profile_image} alt="" />
          ) : (
            <img src={user.profile_image} alt="" />
          )}

          {isGuestProfile ? (
            <p>
              {guestInfo.firstname} {guestInfo.lastname}
            </p>
          ) : (
            <p>
              {user.firstname} {user.lastname}
            </p>
          )}

          <br />
          {isGuestProfile ? (
            <p>{guestInfo.location}</p>
          ) : (
            <p>{user.location}</p>
          )}
          <br />
          {isGuestProfile ? (
            <p>Language:{guestInfo.primary_language}</p>
          ) : (
            <p>Language:{user.primary_language}</p>
          )}
          <br />
          {isGuestProfile ? (
            <p>Skills:{guestInfo.skills}</p>
          ) : (
            <p>Skills:{user.skills}</p>
          )}
          <br />
          <p>About me:</p>
          {isGuestProfile ? (
            <p>{guestInfo.about_me}</p>
          ) : (
            <p>{user.about_me}</p>
          )}
          {/* button logout/contact  */}
          {routerId === user.id ? (
            <button
              onClick={() => {
                Cookies.remove("authToken");
                history.push("/login");
              }}
            >
              {" "}
              Logout{" "}
            </button>
          ) : (
            <>
              <button>Connect</button>
              <button onClick={() => setIsPopupDisplayed(true)}>Contact</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
