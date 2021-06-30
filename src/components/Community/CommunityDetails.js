import React from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./CommunityDetails.css";
import { AuthContext } from "../../Context/AuthContext";

const CommunityDetails = ({ community, setCommunity, match }) => {
  const communityId = Number(match.params.id);
  // const postId = Number(match.params.id);
  const { user, setUser } = React.useContext(AuthContext);
  const [eventsByCommunity, setEventsByCommunity] = React.useState([]);
  const [postsByComunity, setPostsByComunity] = React.useState([]);
  const [newPost, setNewPost] = React.useState({
    user_id: user.id,
    community_id: communityId,
  });

  React.useEffect(() => {
    fetchEvents(communityId);
    fetchPosts(communityId);
  }, []);

  React.useEffect(() => {
    console.log(postsByComunity);
  }, []);

  const fetchEvents = (communityId) => {
    axios
      .get(`/events/${communityId}`)
      .then((response) => setEventsByCommunity(response.data))
      .catch((err) => console.log(err));
  };

  const fetchPosts = (communityId) => {
    axios
      .get(`/posts?community_id=${communityId}`)
      .then((response) => setPostsByComunity(response.data))
      .catch((err) => console.log(err));
  };
  const createPost = (event) => {
    event.preventDefault();
    axios
      .post(`/posts`, newPost)
      .then((response) => {
        setPostsByComunity([response.data, ...postsByComunity]);
        setNewPost({
          user_id: user.id,
          community_id: communityId,
          post_content: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    <div className="community-container">
      <Header />
      {community
        .filter((item) => item.id === communityId)
        .map((item) => (
          <h1>{item.name}</h1>
        ))}
      <h1 className="h1-community-events">Events</h1>
      {eventsByCommunity.map((event) => {
        return (
          <div>
            <img
              className="community-details-cover"
              src={event.event_image}
              alt=""
            />
            <p className="h1-community-events">
              {event.firstname} {event.lastname}
            </p>
            <p className="h1-community-events">{event.event_title}</p>
            <p className="h1-community-events">{event.event_date}</p>
            <a
              href={event.link}
              target="_blank"
              className="h1-community-events"
            >
              Join
            </a>
          </div>
        );
      })}

      <Link
        to={{
          pathname: "/add-event",
          state: { community_id: communityId },
        }}
      >
        + Add event
      </Link>
      <div>
        <h1 className="h1-community-post">Posts</h1>

        <form onSubmit={createPost}>
          <textarea
            id="post_content"
            name="post_content"
            onChange={handleChange}
            value={newPost.post_content}
            placeholder="Share your ideas..."
            className="text-area"
          ></textarea>
          <button type="submit" className="button-share">
            Share
          </button>
        </form>
      </div>

      {postsByComunity.map((post) => {
        return (
          <div>
            <Link to={`/profile/${post.user_id}`}>
              <img src={post.profile_image} alt="" />
            </Link>
            <p>{post.post_content}</p>
            <button>Comment</button>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityDetails;
