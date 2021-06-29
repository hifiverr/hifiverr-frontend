import React from "react";
import axios from "axios";
import "./Community.css";

function Community() {
  const [community, setCommunity] = React.useState([]);

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
      <h1>Header</h1>
      {community.map(function (group, index) {
        return (
          <div className="group">
            <img className="group-" src={group.image} />
            <h1 className="group-tittle">{group.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Community;
