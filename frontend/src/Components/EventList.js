import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Event from "./Event";
import { Grid, Typography } from "@mui/material";
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

  useEffect(() => {
    const getPrivateEvents = async () => {
      try {
        var config = {
          method: "get",
          url: bp.buildPath("api/events/private/" + user.id),
          // headers: { Authorization:"TOKEN GOES HERE"}
        };

        const resp = await axios(config);

        setPrivateEventList(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    getPrivateEvents();
  }, [privateEventList.event_id]);

  return (
    <div>
      {eventList.length > 0 && (
        <div>
          <Grid
            sx={{
              display: "flex",
              gap: 2,
              overflow: "auto",
            }}
          >
            <Typography variant="h6">PUBLIC</Typography>
            {eventList.map((e) => (
              <Event key={e.event_id} event={e} />
            ))}
          </Grid>
        </div>
      )}
      {rsoList.length > 0 && (
        <div>
          <Grid sx={{ display: "inlineflex", gap: 2, overflow: "auto" }}>
            <Typography variant="h6">RSO</Typography>
            {rsoList.map((e) => (
              <Event key={e.event_id} event={e} />
            ))}
          </Grid>
        </div>
      )}
      {privateEventList.length > 0 && (
        <div>
          <Grid sx={{ display: "inlineflex", gap: 2, overflow: "auto" }}>
            <Typography variant="h6">PRIVATE</Typography>
            {privateEventList.map((e) => (
              <Event key={e.event_id} event={e} />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default EventList;
