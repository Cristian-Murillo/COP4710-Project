import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import EventList from "./Components/EventList";
import { Link } from "react-router-dom";
import { UserContext } from "./Components/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          exact
          path="/"
          element={user ? <EventList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
