// components/profile.js
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import EditProfile from "./EditProfile/EditProfile";
import edit_profile from "../assets/edit_profile.svg";
import axios from "axios";
import Header from "../Header/Header";
import "./Profile.css"

const Profile = ({ match }) => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  const [isUserInEditMode, setIsUserInEditMode] = useState(false);
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);
  const [isGuestProfile, setIsGuestProfile] = useState(false);
  const [guestInfo, setGuestInfo] = useState({});

  const routerId = Number(match.params.id);
  console.log("router id", routerId);
  console.log("user id", user.id);

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
          <div className="popup-container">
            <div className="popup-content">
            <button onClick={() => setIsPopupDisplayed(false)}>X</button>
            <h2>
              {guestInfo.firstname} {guestInfo.lastname}
            </h2>
            <h4>{guestInfo.email}</h4>
            </div>
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

          {/* Header section */}
          <div className="profile-header-container">
            <img className="profile-header-image" src={isGuestProfile ? guestInfo.profile_image : user.profile_image} alt="" />
              <div className="profile-header-content-container">
                <p className="profile-header-content-text">{isGuestProfile ? guestInfo.firstname : user.firstname} {isGuestProfile ?  guestInfo.lastname : user.lastname}</p>
                <p className="profile-header-content-text">{isGuestProfile ? guestInfo.location : user.location}</p>
              </div>
            {/* button edit profile  */}
            {routerId === user.id ? (
              <img className="profile-header-settings" src={edit_profile} onClick={() => setIsUserInEditMode(true)} />
            ) : null}
          </div>
          <div className="about-container">
            <h3>Language</h3>
            <p className="about-subheading">{ isGuestProfile ? guestInfo.primary_language : user.primary_language}</p>
            <h3>Skills</h3>
            <p className="about-subheading">{ isGuestProfile ? guestInfo.skills : user.skills}</p>
          </div>
            {/* About section */}
            <div className="about-background-container">
              <div className="about-container">
                <h3>About me</h3>
                <p className="about-subheading-white">{isGuestProfile ? guestInfo.about_me : user.about_me}</p>
                {/* button logout/contact  */}
                {routerId === user.id ? 
                null
                // (
                  // <button
                  //   onClick={() => {
                  //     Cookies.remove("authToken");
                  //     history.push("/login");
                  //   }}
                  // >
                  //   {" "}
                  //   Logout{" "}
                  // </button>
                // )
                : (
                  <div className="button-container">
                    <button className="profile-button">Connect</button>
                    <button className="profile-button" onClick={() => setIsPopupDisplayed(true)}>Contact</button>
                  </div>
                )}
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
