import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { user } from "../../Context/AuthContext";
import { AuthContext } from "../../Context/AuthContext";
import upload_image from "../assets/upload_image.svg";
import "./CreateEvents.css";

const CreateEvents = () => {
  const history = useHistory();
  const { user, setUser } = React.useContext(AuthContext);

  const [isImageDisplayed, setIsImageDisplayed] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState({
    community_id: Number(history.location.state.community_id),
    user_id: user.id,
    profile_image: upload_image,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/events", createdEvent)
      .then((response) => {
        history.goBack(1);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setCreatedEvent({ ...createdEvent, [name]: value });
  };

  return (
    <div className="create-events-container">
      <form onSubmit={handleSubmit}>
        {isImageDisplayed ? (
          <div className="signup-header">
            <label htmlFor="event_image" className="profile_image_label">
              Upload Image
            </label>
            <input
              value={createdEvent.event_image}
              name="event_image"
              id="event_image"
              onChange={handleChange}
              className="profile-image-input"
            />
            <button
              onClick={() => setIsImageDisplayed(false)}
              className="upload_image_button"
            >
              Confirm
            </button>
          </div>
        ) : (
          <img
            src={createdEvent.profile_image}
            onClick={() => setIsImageDisplayed(true)}
            className="upload_image_events"
          />
        )}

        <label htmlFor="title" className="createEvent-h1">
          Title
        </label>
        <br />
        <input
          id="title"
          name="event_title"
          value={createdEvent.event_title}
          onChange={handleChange}
          className="inputs"
        />
        <br />
        <label htmlFor="content" className="createEvent-h1">
          Content
        </label>
        <br />
        <textarea
          id="event_content"
          name="event_content"
          value={createdEvent.event_content}
          onChange={handleChange}
          className="content_area"
        />
        <br />
        <label htmlFor="date" className="createEvent-h1">
          Date
        </label>
        <br />
        <input
          id="datetime"
          type="datetime-local"
          min="2021-06-01T00:00"
          name="event_date"
          value={createdEvent.event_date}
          onChange={handleChange}
          className="inputs"
        />
        <br />
        <label htmlFor="link" className="createEvent-h1">
          Link
        </label>
        <br />
        <input
          id="link"
          name="link"
          value={createdEvent.link}
          onChange={handleChange}
          className="inputs"
        />
        <br />
        <div className="buttons_container">
          <button
            className="cancel-button"
            type="button"
            onClick={() => history.goBack(1)}
          >
            Cancel
          </button>
          <br />
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
