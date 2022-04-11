import React, { useState } from "react";
import { default as AppBar } from "../Components/AppBar";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../Components/UserContext";
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";

const Event = () => {
  const [publicEvent, setPublicEvent] = useState(0);
  const [privateEvent, setPrivateEvent] = useState(0);
  const [rso, setRso] = useState(0);
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const bp = require("../Components/Path");

  const { user } = useContext(UserContext);
  console.log(publicEvent + " " + privateEvent + " " + rso);

  const postEvent = async () => {
    const eventData = {
      id: user.id,
      eventName,
      eventDate: moment(startDate).format(),
      description,
      contactEmail: user.email,
      isRSO: rso,
      isPublic: publicEvent,
      isPrivate: privateEvent,
      address,
    };
    try {
      var config = {
        method: "post",
        url: bp.buildPath("api/events/create"),
        // headers: { Authorization:"TOKEN GOES HERE"}
        data: eventData,
      };

      const resp = await axios(config);

      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <AppBar />
      </div>
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton>
              <AddIcon />
            </IconButton>
          }
          title="Create Event"
          subheader="hi"
        ></CardHeader>
        <CardContent>
          <TextField
            label="Event Name"
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
          <TextField
            label="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            label="describe the event"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <CardActions>
            <RadioGroup>
              <FormControlLabel
                value="public"
                control={
                  <Radio
                    onChange={() => {
                      setPublicEvent(1);
                      setPrivateEvent(0);
                      setRso(0);
                    }}
                  />
                }
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={
                  <Radio
                    onChange={() => {
                      setPublicEvent(0);
                      setPrivateEvent(1);
                      setRso(0);
                    }}
                  />
                }
                label="Private"
              />
              <FormControlLabel
                value="rso"
                control={
                  <Radio
                    onChange={() => {
                      setPublicEvent(0);
                      setPrivateEvent(0);
                      setRso(1);
                    }}
                  />
                }
                label="RSO"
              />
            </RadioGroup>
          </CardActions>
          <CardActions>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </CardActions>
        </CardContent>
        <CardActions>
          <Button onClick={postEvent}>Create Event</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Event;
