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
  const [communityInfo, setCommunityInfo] = React.useState({
    name: "",
  });

  const [newPost, setNewPost] = React.useState({
    user_id: user.id,
    community_id: communityId,
  });

  React.useEffect(() => {
    fetchEvents(communityId);
    fetchPosts(communityId);
    fetchCommunityById(communityId);
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

  const fetchCommunityById = (communityId) => {
    axios
      .get(`/communities/${communityId}`)
      .then((response) => {
        setCommunityInfo(response.data);
      })
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

  console.log(community);

  return (
    <>
      <Header />
      <div className="community-details-name">
        <h1>{communityInfo.name}</h1>
      </div>
      <div className="community-container">
        <h1 className="h1-community-post event-first-title">Events</h1>
        <div className="community-details-events-flex-container">
          {eventsByCommunity.map((event) => {
            return (
              <div className="community-details-event-flex-item">
                <div className="events-img-container">
                  <img
                    className="community-details-cover"
                    src={event.event_image}
                    alt=""
                  />
                </div>
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
        </div>

        <Link
          to={{
            pathname: "/add-event",
            state: { community_id: communityId },
          }}
          className="add-event-button"
        >
          <span className="add-event-plus-sign">+</span> Add event
        </Link>
        <div>
          <h1 className="h1-community-post">Feed</h1>

          <form onSubmit={createPost}>
            <textarea
              id="post_content"
              name="post_content"
              onChange={handleChange}
              value={newPost.post_content}
              placeholder="Share your ideas..."
              className="text-area"
              style={{
                width: "94%",
                height: "30px",
                padding: "10px",
                background: "#e5e5e5",
                border: "none",
              }}
            ></textarea>
            <button type="submit" className="comment-button">
              Share
            </button>
          </form>
        </div>

        <div
          style={{
            height: "40px",
            marginBottom: "40px",
          }}
        />

        {postsByComunity.map((post) => {
          return (
            <div style={{ marginTop: "50px" }}>
              <div className="community-post-container">
                <Link to={`/profile/${post.user_id}`} className="profile-image">
                  <img
                    className="community-post-image"
                    src={post.profile_image}
                    alt=""
                  />
                </Link>
                <div style={{ position: "relative", width: "100%" }}>
                  <p className="post-content">{post.post_content}</p>
                  <button className="comment-button">Comment</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommunityDetails;
