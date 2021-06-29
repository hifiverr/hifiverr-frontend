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
      {community.map(function (group, index) {
        return (
          <div className="group">
            <Link to={`/community/${group.id}`}>
              <img className="group-image" src={group.image} />
              <h1 className="group-tittle">{group.name}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Community;
