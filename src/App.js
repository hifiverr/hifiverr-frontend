import logo from "./logo.svg";
import "./App.css";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext.js";
import logIn from "./components/LogIn.js/LogIn";
import signUp from "./components/SignUp/SignUp";

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
           <Route path="/login" component={Login} />
           <Route path="/signup" component={Signup} />
           <ProtectedRoute path="/profile" component={Profile} />
           <Redirect to="/login" />
         </Switch>
       </BrowserRouter>
     </AuthContextProvider>
      
    </div>
  );
}

export default App;
