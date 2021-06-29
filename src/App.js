import React from "react";
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn.js/LogIn";
import Community from "./components/Community/Community";
import feed from "./components/Community/feed";

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
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route path="/community" component={Community} />
            {/* <Route path="/feed" component={feed} /> */}
            <Route path="/signup" component={SignUp} />
            <ProtectedRoute path="/profile/:id" component={Profile} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
