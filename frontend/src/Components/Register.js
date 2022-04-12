import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
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
  const [superAdmin, setSuperAdmin] = useState(0);
  const [admin, setAdmin] = useState(0);

  var bp = require("./Path");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      admin: admin,
      superAdmin: superAdmin,
    };
    var newUserjson = JSON.stringify(newUser);

    var config = {
      method: "post",
      url: bp.buildPath("api/users/signup"),
      headers: {
        "Content-Type": "application/json",
      },
      data: newUserjson,
    };

    axios(config)
      .then(function (response) {
        var res = response.data;

        if (res.error) {
          // will need changing later to another page
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        console.log(error);
      });

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
          {/* <FormControlLabel
            label="Super Admin"
            control={<Checkbox onChange={() => setSuperAdmin(!superAdmin)} />}
          />
          <FormControlLabel
            label="Admin"
            control={<Checkbox onChange={() => setAdmin(!admin)} />}
          /> */}
          {/*might need improvement */}
          <RadioGroup>
            <FormControlLabel
              value="user"
              control={
                <Radio
                  onChange={() => {
                    setAdmin(0);
                    setSuperAdmin(0);
                  }}
                />
              }
              label="User"
            />
            <FormControlLabel
              value="superAdmin"
              control={
                <Radio
                  onChange={() => {
                    setAdmin(0);
                    setSuperAdmin(1);
                  }}
                />
              }
              label="Super Admin"
            />
            <FormControlLabel
              value="admin"
              control={
                <Radio
                  onChange={() => {
                    setAdmin(1);
                    setSuperAdmin(0);
                  }}
                />
              }
              label="Admin"
            />
          </RadioGroup>
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
