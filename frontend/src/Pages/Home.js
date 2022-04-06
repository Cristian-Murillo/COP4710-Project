import React from "react";
import EventList from "../Components/EventList";
import { default as AppBar } from "../Components/AppBar";

const Home = () => {
  return (
    <div>
      {" "}
      <div>
        <AppBar />
      </div>
      Home Page
      <br />
      <EventList />
    </div>
  );
};

export default Home;
