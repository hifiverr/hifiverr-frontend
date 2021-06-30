import React from "react";
import axios from "axios";
import "./Community.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Community({ community, setCommunity }) {
  React.useEffect(() => {
    fetchCommunity();
  }, []);

  function fetchCommunity() {
    axios
      .get("/communities")
      .then(function (response) {
        setCommunity(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <Header />
      <div className="title">
        <h1 className="title_text">Communities</h1>
      </div>
      <div className="group_container">
        {community.map(function (group, index) {
          return (
            <div className="community_container">
              <Link to={`/community/${group.id}`} className="link_container">
                <div className="image-container">
                  <img className="group-image" src={group.image} />
                </div>
                <h1 className="group-tittle">{group.name}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Community;
