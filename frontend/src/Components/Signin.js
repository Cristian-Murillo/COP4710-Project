import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "auto",
};

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginCredentials = {
      email,
      password,
    };
    console.log(loginCredentials);
    return;
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h4">Login</Typography>
          <Typography variant="caption">
            Fill out information below to login
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
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
            type="password"
            fullWidth
            variant="standard"
            label="Password"
            placeholder="Please enter your password"
          ></TextField>

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button>Sign Up</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;
