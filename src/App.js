import React from "react";
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn.js/LogIn";
import CreateEvents from "./components/CreateEvents/CreateEvents";
import Community from "./components/Community/Community";
import CommunityDetails from "./components/Community/CommunityDetails";

import "./App.css";
import Profile from "./components/Profile/Profile";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  const [community, setCommunity] = React.useState([]);
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route
              exact
              path="/community"
              render={() => (
                <Community community={community} setCommunity={setCommunity} />
              )}
            />
            <Route
              path="/community/:id"
              render={(props) => (
                <CommunityDetails
                  {...props}
                  community={community}
                  setCommunity={setCommunity}
                />
              )}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/add-event" component={CreateEvents} />
            <ProtectedRoute path="/profile/:id" component={Profile} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
