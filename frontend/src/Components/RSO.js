import { Typography, Button, Snackbar } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function RSO() {
  const [rso_name, setRso_Name] = useState("");
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const bp = require("./Path");

  const joinRso = async () => {
    const rsoInfo = {
      rso_name,
      id: user.id,
    };
    var config = {
      method: "post",
      url: bp.buildPath("api/users/join/rso"),
      // headers: { Authorization:"TOKEN GOES HERE"}
      data: rsoInfo,
    };
    try {
      const resp = await axios(config);

      console.log(resp.data);
      setMessage(resp.data.msg);
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Typography variant="body1">
        Want to join an RSO? check availabilty here
      </Typography>
      <TextField
        variant="standard"
        label="RSO Name"
        onChange={(e) => {
          setRso_Name(e.target.value);
        }}
      />
      <Button size="large" onClick={joinRso}>
        Check
      </Button>
    </>
  );
}
