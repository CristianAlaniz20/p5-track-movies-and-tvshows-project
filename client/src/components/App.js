import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Header from "./Header";
import CreateMovieForm from "./CreateMovieForm";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage setIsloggedIn={setIsLoggedIn} />
  }

  return (
    <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/create_movie" component={CreateMovieForm} />
          </Switch>
        </div>
    </Router>
  )
}

export default App;
