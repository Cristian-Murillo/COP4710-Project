import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "auto",
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [err, setErr] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="caption">
            Please fill out form to create an account
          </Typography>
        </Grid>
        <form>
          <TextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
            label="Email"
            placeholder="Please enter your email"
          ></TextField>
          <TextField
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password !== conPass ? true : false}
            type="password"
            fullWidth
            variant="standard"
            label="Password"
            placeholder="Please enter your password"
          ></TextField>
          <TextField
            required
            value={conPass}
            onChange={(e) => setConPass(e.target.value)}
            error={password !== conPass ? true : false}
            type="password"
            fullWidth
            variant="standard"
            label="Confirm password"
            placeholder="Please enter your password"
          ></TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
