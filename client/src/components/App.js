import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Header from "./Header";
import CreateMoviePage from "../pages/CreateMoviePage";
import CreateTVShowPage from "../pages/CreateTVShowPage";
import NavBar from "./NavBar";
import MovieDetails from "../pages/MovieDetails";
import TVShowDetails from "../pages/TVShowDetails";
import CreateMovieWatchEvent from "./CreateMovieWatchEvent";
import CreateTVShowWatchEvent from "./CreateTVShowWatchEvent";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // isLoggedIn state

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

  // route to login page if user isn't logged in
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
            <Route path="/movie/:movie_id" component={MovieDetails} />
            <Route path="/tv_show/:tv_show_id" component={TVShowDetails} />
            <Route path="/add_to_movie_list/:movie_id" component={CreateMovieWatchEvent} />
            <Route path="/add_to_tv_show_list/:tv_show_id" component={CreateTVShowWatchEvent} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
