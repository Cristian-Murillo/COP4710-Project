import React from "react";
import EventList from "../Components/EventList";
import { default as AppBar } from "../Components/AppBar";
import RSO from "../Components/RSO";

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
      <div>
        <br />
        <RSO />
      </div>
    </div>
  );
};

export default Home;
