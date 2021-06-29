import React from "react";
import axios from "axios";

const CreateEvents = () => {
  const [createdEvent, setCreatedEvent] = React.useState({});
  const [users, setUsers] = React.useState([]);

  //get all users
  //render dropdown
  //when the user is selected put it in the state ready for the post
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <label htmlFor="user">User name</label>
        <select name="user" id="name">
          {users.map((user) => (
            <option value={user.firstname + " " + user.lastname}>
              {user.firstname}
              {user.lastname}
            </option>
          ))}
        </select>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" onChange={handleChange} />
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" onChange={handleChange} />
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" onChange={handleChange} />
      </form>
    </div>
  );
};

export default CreateEvents;
