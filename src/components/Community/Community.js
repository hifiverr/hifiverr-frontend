import axios from "axios";
import { useEffect, useState } from "react";

const Community = () => {
  const [communities, setCommunities] = useState([]);

  const fetchCommunities = () => {
    axios
      .get("/communities")
      .then((response) => setCommunities(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return <div>community</div>;
};

export default Community;
