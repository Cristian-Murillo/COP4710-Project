import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "auto",
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      admin,
      superAdmin,
    };
    console.log(newUser);
    return;
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
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password !== conPass || !password.length >= 4 ? true : false}
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
            error={password !== conPass || !conPass.length >= 4 ? true : false}
            type="password"
            fullWidth
            variant="standard"
            label="Confirm password"
            placeholder="Please enter your password"
          ></TextField>
          <FormControlLabel
            label="Super Admin"
            control={<Checkbox onChange={() => setSuperAdmin(!superAdmin)} />}
          />

          <FormControlLabel
            label="Admin"
            control={<Checkbox onChange={() => setAdmin(!admin)} />}
          />
          <Button
            disabled={
              !/\S+@\S+\.\S+/.test(email) ||
              password !== conPass ||
              password.length < 4
            }
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
