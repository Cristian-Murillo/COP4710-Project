import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import EventList from "./Components/EventList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
