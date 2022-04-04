import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import EventList from "./Components/EventList";
import { UserContext } from "./Components/UserContext";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Signup />} />
          <Route
            exact
            path="/"
            element={user ? <Link to="/" /> : <EventList />}
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
