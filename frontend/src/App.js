import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  Suspense,
  lazy,
} from "react";

import Signup from "./components/signup.js";
import Login from "./components/login.js";
import Homepage from "./components/homepage.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";
import { get } from "./services/fetch_crud.js";

import { UserProvider } from "./components/userContext";
import axios from "axios";

import UserContext from "./contexts/user.js";

function App() {
  const API_URL = "localhost:5000";
  const [userInfo, setUserInfo] = useState();
  const [authenticated, setIsAuthenticated] = useState(false);
  let history = useHistory();

  const handleAuth = () =>
    setIsAuthenticated((authenticated) => !authenticated);

  const getInfo = () =>
    axios
      .get("http://localhost:3000/account/info")
      .then((res) => {
        console.log("auth:", authenticated);
        if (res.status === "401") {
          setIsAuthenticated(false);
        } else if (res.statusText === "OK") {
          setUserInfo({
            name: res.data.firstName,
            id: res.data.id,
            auth: handleAuth,
          });
          setIsAuthenticated(true);
          console.log("fname: ", res.data);
        } else {
          const message = `Status: ${res.status}; Message: ${res.statusText};`;
          throw new Error(message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.log(err);
        }
      });

  useEffect(() => {
    getInfo();
    console.log("Authed");
  }, [authenticated]);

  //const UserContext = createContext('Username')

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? (
            <UserContext.Provider value={userInfo}>
              <Homepage />
            </UserContext.Provider>
          ) : (
            <Login auth={handleAuth} />
          )}
        </Route>
        <Route exact path="/login">
          <Login auth={handleAuth} />
        </Route>
        <Route exact path="/signup">
          <Signup auth={handleAuth} />
        </Route>
        <Route exact path="/home" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;

// component={isLoading ? loading : page}
