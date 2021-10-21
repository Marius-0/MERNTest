import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { get, post, postFunc } from "../services/fetch_crud.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  main: {
    width: "432px",
    margin: "auto",
    padding: "16px",
  },
  btn: {
    fontWeight: "600",
    fontSize: "18px",
    padding: "8px",
    textTransform: "none",
  },
});

function Login({ auth }) {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  let history = useHistory();

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:5000/account/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("login res:", res);
        auth();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="email"
            fullWidth={true}
            variant="outlined"
            label="Email address"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            fullWidth={true}
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            fullWidth={true}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Grid>
        <Grid item xs={12}>
          <a
            href="#" //TODO finish
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot password?
          </a>
        </Grid>
        <Grid item xs={12}>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withRouter(Login);
