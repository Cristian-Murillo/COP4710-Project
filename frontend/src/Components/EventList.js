import React, { useEffect, useState } from "react";
import axios from "axios";
import Event from "./Event";

const EventList = () => {
  const bp = require("./Path");
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        var config = {
          method: "get",
          url: bp.buildPath("api/events/"),
          // headers: { Authorization:"TOKEN GOES HERE"}
        };

        const resp = await axios(config);

        setEventList(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    getEvents();
  }, [eventList.event_id]);

  return (
    <div>
      {eventList.map((e) => (
        <Event key={e.event_id} event={e} />
      ))}
    </div>
  );
};

export default EventList;
