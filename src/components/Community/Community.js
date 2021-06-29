import React from "react";
import axios from "axios";

function Community() {
  const [community, setCommunity] = React.useState([]);

  React.useEffect(() => {
    fetchCommunitys();
  }, []);

  function fetchCommunitys() {
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
          <div>
            <h1>{group.name}</h1>
            <img src={group.image} />
          </div>
        );
      })}
    </div>
  );
}

export default Community;
