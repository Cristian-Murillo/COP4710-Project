import React, { useState } from "react";
import { default as AppBar } from "../Components/AppBar";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
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
import { create } from "@mui/material/styles/createTransitions";

const Event = () => {
  const [publicEvent, setPublicEvent] = useState(0);
  const [privateEvent, setPrivateEvent] = useState(0);
  const [rso, setRso] = useState(0);
  const [eventName, setEventName] = useState("");
  const [rso_name, setRso_name] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [rsoGroupName, setRsoGroupName] = useState("");
  const bp = require("../Components/Path");

  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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

      setMessage(resp.data.msg);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const postRsoEvent = async () => {
    const rsoData = {
      id: user.id,
      eventName,
      rso_name,
      eventDate: moment(startDate).format(),
      description,
      contactEmail: user.email,
      address,
    };
    try {
      var config = {
        method: "post",
        url: bp.buildPath("api/events/create/rso"),
        // headers: { Authorization:"TOKEN GOES HERE"}
        data: rsoData,
      };

      const resp = await axios(config);

      setMessage(resp.data.msg);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };
  const createRSO = async () => {
    const rsoGroupData = {
      id: user.id,
      rso_name: rsoGroupName,
    };
    try {
      var config = {
        method: "post",
        url: bp.buildPath("api/users/create/rso"),
        // headers: { Authorization:"TOKEN GOES HERE"}
        data: rsoGroupData,
      };

      const resp = await axios(config);

      setMessage(resp.data.msg);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <AppBar />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      {user.isAdmin || user.isSuperAdmin ? (
        <div>
          <Card sx={{ width: "50%", height: "50%", m: "auto" }} elevation={24}>
            <CardHeader
              // action={
              //   <IconButton>
              //     <AddIcon />
              //   </IconButton>
              // }
              title="Create event for your university"
              subheader="Fill out the fields below and create you event"
            ></CardHeader>
            <CardContent>
              <TextField
                label="Event Name"
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
              {rso === 1 && (
                <TextField
                  label="RSO Name"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                />
              )}
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
                  {
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
                  }
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
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={rso === 1 ? postRsoEvent : postEvent}>
                Create Event
              </Button>
            </CardActions>
          </Card>
          <br />
          <Card sx={{ width: "50%", height: "50%", m: "auto" }} elevation={24}>
            <CardHeader
              title="Create RSO Group"
              subheader="Create a group name and start finding people to join your group"
            />
            <CardContent>
              <TextField
                variant="standard"
                label="Name of group"
                onChange={(e) => {
                  setRsoGroupName(e.target.value);
                }}
              />
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={createRSO}>Create RSO</Button>
            </CardActions>
          </Card>
        </div>
      ) : (
        <Card sx={{}}>
          <CardContent>
            <Typography
              sx={{ width: "50%", height: "50%", m: "auto" }}
              variant="h3"
            >
              404 Page Not Found
            </Typography>
            <Typography sx={{ display: "right" }} variant="h6">
              User doesn't have correct credentials to access this page
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Event;
