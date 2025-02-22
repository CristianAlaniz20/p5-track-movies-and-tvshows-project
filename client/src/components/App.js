import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SearchDatabase from "../pages/SearchDatabase";
import Header from "./Header";
import CreateMoviePage from "../pages/CreateMoviePage";
import CreateTVShowPage from "../pages/CreateTVShowPage";
import NavBar from "./NavBar";
import MoviePage from "../pages/MoviePage";
import TVShowPage from "../pages/TVShowPage";
import MovieWatchEventForm from "./MovieWatchEventForm";
import TVShowWatchEventForm from "./TVShowWatchEventForm";
import { UserContext } from "../contexts/UserContext";
import UserDashboard from "../pages/UserDashboard";
import DeleteWatchEvent from "./DeleteWatchEvent";


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
            <Route exact path="/movies/:movie_id" component={MoviePage} />
            <Route exact path="/tv_shows/new" component={CreateTVShowPage} />
            <Route exact path="/tv_shows/:tv_show_id" component={TVShowPage} />
            <Route exact path="/movies/:movie_id/events/new" component={MovieWatchEventForm} />
            <Route exact path="/tv_shows/:tv_show_id/events/new" component={TVShowWatchEventForm} />
            <Route exact path="/movies/:movie_id/events/:event_id/edit" component={MovieWatchEventForm} />
            <Route exact path="/tv_shows/:tv_show_id/events/:event_id/edit" component={TVShowWatchEventForm} />
            <Route exact path="/movies/:movie_id/events/:event_id/delete" component={DeleteWatchEvent} />
            <Route exact path="/tv_shows/:tv_show_id/events/:event_id/delete" component={DeleteWatchEvent} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
