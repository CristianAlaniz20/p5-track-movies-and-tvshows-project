import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SearchDatabase from "../pages/SearchDatabase";
import Header from "./Header";
import CreateMoviePage from "../pages/CreateMoviePage";
import CreateTVShowPage from "../pages/CreateTVShowPage";
import NavBar from "./NavBar";
import MoviePage from "../pages/MoviePage";
import TVShowDetails from "../pages/TVShowDetails";
import MovieWatchEventForm from "./MovieWatchEventForm";
import TVShowWatchEventForm from "./TVShowWatchEventForm";
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
            <Route exact path="/movies/:movie_id" component={MoviePage} />
            <Route exact path="/tv_shows/new" component={CreateTVShowPage} />
            <Route exact path="/tv_shows/:tv_show_id" component={TVShowDetails} />
            <Route exact path="/movies/:movie_id/events/new" component={MovieWatchEventForm} />
            <Route exact path="/tv_shows/:tv_show_id/events/new" component={TVShowWatchEventForm} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
