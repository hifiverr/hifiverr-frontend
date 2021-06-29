import React from "react";
import profile from "../assets/profile.svg";
import logo from "../assets/logo.svg";
import community from "../assets/community.svg";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Header() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="header_container">
      <Link to={`/profile/${user.id}`} className="profile_logo_container">
        <img src={profile} alt="profile_logo" className="profile_logo" />
      </Link>
      <img src={logo} alt="logo" className="logo" />
      <Link to={`/community`} className="community_logo_container">
        <img src={community} alt="community_logo" className="community_logo" />
      </Link>
    </div>
  );
}

export default Header;
