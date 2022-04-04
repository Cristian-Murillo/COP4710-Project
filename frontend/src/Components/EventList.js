import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Event from "./Event";
import { Typography } from "@mui/material";
import { UserContext } from "./UserContext";

const EventList = () => {
  const bp = require("./Path");
  const [eventList, setEventList] = useState([]);
  const [rsoList, setRsoList] = useState([]);
  const [privateEventList, setPrivateEventList] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getEvents = async () => {
      try {
        var config = {
          method: "get",
          url: bp.buildPath("api/events/public"),
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

  useEffect(() => {
    const getRsoEvents = async () => {
      try {
        var config = {
          method: "get",
          url: bp.buildPath("api/events/rso"),
          // headers: { Authorization:"TOKEN GOES HERE"}
        };

        const resp = await axios(config);

        setRsoList(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    getRsoEvents();
  }, [rsoList.event_id]);

  return (
    <div>
      <Typography variant="h1">{user}</Typography>
      <div>
        {eventList.map((e) => (
          <Event key={e.event_id} event={e} />
        ))}
      </div>
      <div>
        {rsoList.map((e) => (
          <Event key={e.event_id} event={e} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
