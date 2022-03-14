import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function Event({ event }) {
  const { eventName } = event;
  return (
    <Card variant="outlined">
      <div>
        <CardContent>
          <Typography variant="h2">{eventName}</Typography>
        </CardContent>
      </div>
    </Card>
  );
}
export default Event;
