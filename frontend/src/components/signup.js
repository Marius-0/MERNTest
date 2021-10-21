import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    width: "432px",
    margin: "auto",
    padding: "16px",
  },
  bdayLbl: {
    fontSize: "1em",
    padding: "0px",
  },
  centerElems: {
    display: "flex",
    justifyContent: "center",
  },
});

const textFieldTheme = createTheme({
  props: {
    MuiTextField: {
      size: "small",
      fullWidth: true,
      variant: "outlined",
    },
    MuiFormControl: {
      size: "small",
      fullWidth: true,
      variant: "outlined",
    },
  },
});

function SelectItem({
  label,
  xsNo,
  handleChange,
  value,
  noOfItems,
  startIndex = 1,
}) {
  const menuItems = (noOfItems, startNo) =>
    Array.from(Array(noOfItems), (e, i) => startNo + i).map((x) => (
      <MenuItem key={x} value={x}>
        {x}
      </MenuItem>
    ));

  return (
    <Grid item xs={xsNo}>
      <FormControl>
        <InputLabel htmlFor="my-input">{label}</InputLabel>
        <Select label={label} value={value} onChange={handleChange}>
          {menuItems(noOfItems, startIndex)}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default function Signup({ auth }) {
  const classes = useStyles();

  const wrongDateError = () => console.log("Wrong date", day, month);

  const [day, setDay] = React.useState("");
  const handleChangeDay = (event) => setDay(event.target.value);
  const [month, setMonth] = React.useState("");
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    console.log(month);

    if ([4, 6, 9, 11].includes(month)) {
      if (day > 30) wrongDateError();
    } else if (month === 2) {
      if (isLeapYear(currentYear) && day > 28)
        console.log("Wrong date", day, month);
      else if (day > 27) console.log("Wrong date", day, month);
    }
  };

  const [year, setYear] = React.useState("");
  const handleChangeYear = (event) => setYear(event.target.value);
  const isLeapYear = (year) =>
    year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

  const maximumProvenAge = 120;
  const currentYear = new Date().getFullYear();
  const minmumUserAge = 13;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const history = useHistory();

  const onSubmit = () => {
    axios
      .post("/account/signup", {
        ...user,
        dateOfBirth: [year, month, day],
      })
      .then((res) => {
        auth();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={textFieldTheme}>
      <Paper className={classes.main}>
        <h1>Signup</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              name="firstName"
              onChange={handleChangeUser}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              name="lastName"
              onChange={handleChangeUser}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email address"
              name="email"
              type="email"
              onChange={handleChangeUser}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={handleChangeUser}
            />
          </Grid>

          <Grid item xs={12} className={classes.bdayLbl}>
            <label>Date of birth</label>
          </Grid>

          <SelectItem
            label="Day"
            xsNo={4}
            handleChange={handleChangeDay}
            value={day}
            noOfItems={31}
          />
          <SelectItem
            label="Month"
            xsNo={4}
            handleChange={handleChangeMonth}
            value={month}
            noOfItems={12}
          />
          <SelectItem
            label="Year"
            xsNo={4}
            handleChange={handleChangeYear}
            value={year}
            noOfItems={maximumProvenAge - minmumUserAge}
            startIndex={currentYear - maximumProvenAge}
          />

          <Grid item xs={12} className={classes.centerElems}>
            <Button color="primary" variant="contained" onClick={onSubmit}>
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            Already have an account yet? <Link to="/login">Log In</Link>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
