import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SearchDatabase from "../pages/SearchDatabase";
import Header from "./Header";
import CreateMoviePage from "../pages/CreateMoviePage";
import CreateTVShowPage from "../pages/CreateTVShowPage";
import NavBar from "./NavBar";
import MovieDetails from "../pages/MovieDetails";
import TVShowDetails from "../pages/TVShowDetails";
import CreateMovieWatchEvent from "./CreateMovieWatchEvent";
import CreateTVShowWatchEvent from "./CreateTVShowWatchEvent";
import { UserContext } from "../contexts/UserContext";
import UserDashboard from "../pages/UserDashboard";


function App() {
  const { isAuthenticated } = useContext(UserContext) // user and isAuthenticated states from UserContext

  // route to login page if user isn't logged in
  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <Router>
        <div>
          <Header />
          <NavBar />
          <br />
          <Switch>
            <Route exact path="/" component={UserDashboard} />
            <Route exact path="/search_database" component={SearchDatabase} />
            <Route exact path="/movies/new" component={CreateMoviePage} />
            <Route exact path="/movies/:movie_id" component={MovieDetails} />
            <Route exact path="/tv_shows/new" component={CreateTVShowPage} />
            <Route exact path="/tv_shows/:tv_show_id" component={TVShowDetails} />
            <Route exact path="/movies/:movie_id/events/new" component={CreateMovieWatchEvent} />
            <Route exact path="/tv_shows/:tv_show_id/events/new" component={CreateTVShowWatchEvent} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
