import React from "react";
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import signUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn.js/LogIn";
import Profile from "./components/CreateProfile/profile";
import Community from "./components/Community/Community";
import feed from "./components/Community/feed";

import "./App.css";

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
            <Route path="/signup" component={signUp} />
            <Route path="/community" component={Community} />
            <Route path="/feed" component={feed} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
