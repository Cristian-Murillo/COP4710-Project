import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Event from "./Pages/Event";
import { Link } from "react-router-dom";
import { UserContext } from "./Components/UserContext";
import Calendar from "./Pages/Calendar";

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
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/event"
          element={user ? <Event /> : <Navigate to="/login" />}
        />
        <Route
          path="/mycalendar"
          element={user ? <Calendar /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
