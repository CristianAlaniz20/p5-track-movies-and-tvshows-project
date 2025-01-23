import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage setIsloggedIn={setIsLoggedIn} />
  }
  
  return <h1>Project Client</h1>;
}

export default App;
