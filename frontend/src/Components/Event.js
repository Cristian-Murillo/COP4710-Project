import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function Event({ event }) {
  const { eventName, eventDate, description, contactEmail, address } = event;
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3">{eventName}</Typography>
        <Typography variant="body1">{eventDate}</Typography>
        <Typography variant="h2">{description}</Typography>
        <Typography variant="h2">{contactEmail}</Typography>
        <Typography variant="h2">{address}</Typography>
      </CardContent>
    </Card>
  );
}
export default Event;
