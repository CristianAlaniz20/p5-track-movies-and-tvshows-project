import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Header from "./Header";
import CreateMoviePage from "../pages/CreateMoviePage";
import CreateTVShowPage from "../pages/CreateTVShowPage";
import NavBar from "./NavBar";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/check_session")
    .then((res) => {
      if (res.status === 200) {
        // for testing purposes
        console.log("Session id was found.")
        setIsLoggedIn(true)
      }
      else {
        // for testing purposes
        console.log("No session id was found.")
        setIsLoggedIn(false)
      }
    })
    .catch(error => console.error(error))
  }, []);

  if (!isLoggedIn) {
    return <LoginPage setIsloggedIn={setIsLoggedIn} />
  }

  return (
    <Router>
        <div>
          <Header />
          <NavBar setIsLoggedIn={setIsLoggedIn} />
          <br />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/create_movie" component={CreateMoviePage} />
            <Route path="/create_tv_show" component={CreateTVShowPage} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
