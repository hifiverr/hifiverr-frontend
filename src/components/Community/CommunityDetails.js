import React from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const CommunityDetails = ({ community, setCommunity, match }) => {
  const communityId = Number(match.params.id);
  const postId = Number(match.params.id);

  const [eventsByCommunity, setEventsByCommunity] = React.useState([]);
  const [postsByComunity, setPostsByComunity] = React.useState([]);

  React.useEffect(() => {
    fetchEvents(communityId);
    fetchPosts(postId);
  }, []);

  const fetchEvents = (communityId) => {
    axios
      .get(`/events/${communityId}`)
      .then((response) => setEventsByCommunity(response.data))
      .catch((err) => console.log(err));
  };

  const fetchPosts = (postId) => {
    axios
      .get(`/posts/${postId}`)
      .then((response) => setPostsByComunity(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Header />
      {community
        .filter((item) => item.id === communityId)
        .map((item) => (
          <h1>{item.name}</h1>
        ))}
      <h1>Events</h1>
      {eventsByCommunity.map((event) => {
        return (
          <div>
            <img src={event.event_image} alt="" />
            <p>{event.event_title}</p>
            <p>{event.event_date}</p>
          </div>
        );
      })}
      <Link to="/add-event">+ Add event</Link>
      <h1>Posts</h1>
      {postsByComunity.map((post) => {
        return (
          <div>
            <img src={post.profile_image} alt="" />
            <p>{post.post_content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityDetails;
