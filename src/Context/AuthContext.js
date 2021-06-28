import react from "React";
import axios from "axios";
import { config } from "../Helpers/authimport";
import cookies from "js-cookies";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {
  const [auth, setAuth] = React.useState(true);
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("/verify-toke", config)
      .then((response) => {
        setUser(response.data.user);
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
        Cookies.remove("authToken");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
