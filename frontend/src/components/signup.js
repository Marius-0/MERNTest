import {
  FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Select, MenuItem, TextField, Button
} from '@material-ui/core';
import { Autorenew, BlurOnSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    width: '432px',
    margin: 'auto',
    padding: '16px'
  },
  bdayLbl: {
    fontSize: '1em',
    padding: '0px'
  },
  centerElems: {
    display: 'flex',
    justifyContent: 'center',
  }
})

const textFieldTheme = createTheme({
  overrides: {
    MuiInput: {
      // Name of the rule
      text: {
        size: 'small',  
        fullWidth: true, 
        variant: 'outlined',
      },
    },
  },
});

function GridItem({label, xsNo, type='text', size='small', variant='outlined', fullW=true}) {
  return (
    <Grid item xs={xsNo}>
      <TextField size={size}  fullWidth={fullW} variant={variant} label={label} type={type} />
    </Grid>
  )
}

function SelectItem({label, xsNo, handleChange, value, size='small', noOfItems, startIndex=1, variant='outlined', fullW=true}) {
  const menuItems = (noOfItems, startNo) => Array.from(Array(noOfItems), (e,i) => startNo + i).map((x) => (
    <MenuItem key={x} value={x}>{x}</MenuItem>
  ))
  
  return (
    <Grid item xs={xsNo}>
      <FormControl size={size} variant={variant} fullWidth={fullW}>
        <InputLabel htmlFor="my-input">{label}</InputLabel>
        <Select
          label={label}
          value={value}
          onChange={handleChange}
        >
          {menuItems(noOfItems, startIndex)}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default function Signup(){
  const classes = useStyles()

  const wrongDateError = () => console.log('Wrong date', day, month)

  const [day, setDay] = React.useState('');
  const handleChangeDay = (event) => setDay(event.target.value)
  const [month, setMonth] = React.useState('');
  const handleChangeMonth = (event) => {
    setMonth(event.target.value)
    console.log(month)

    if([4, 6, 9, 11].includes(month)) {
      if(day > 30)
        wrongDateError()
    } else if(month === 2) {
      if(isLeapYear(currentYear) && day > 28)
        console.log('Wrong date', day, month)
      else if(day > 27)
        console.log('Wrong date', day, month)
    }
  }

  const [year, setYear] = React.useState('');
  const handleChangeYear = (event) => setYear(event.target.value)
  const isLeapYear = (year) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  const maximumProvenAge = 120
  const currentYear = new Date().getFullYear()
  const minmumUserAge = 13

  return (
    <ThemeProvider theme={textFieldTheme}>
    <Paper className={classes.main}>
      <h1>Signup</h1>
      <Grid container spacing={2}>
        <GridItem label='First name' xsNo={6} />
        <GridItem label='Last name' xsNo={6} />
        <GridItem label='Email address' xsNo={12} type='email' />
        <GridItem label='Password' xsNo={12} type='password' />

        <Grid item xs={12} className={classes.bdayLbl}><label >Date of birth</label></Grid>

        <SelectItem label='Day' xsNo={4} handleChange={handleChangeDay}  value={day} noOfItems={31}/>
        <SelectItem label='Month' xsNo={4} handleChange={handleChangeMonth}  value={month} noOfItems={12}/>
        <SelectItem label='Year' xsNo={4} handleChange={handleChangeYear}  value={year}
          noOfItems={maximumProvenAge - minmumUserAge} startIndex={currentYear - maximumProvenAge}/>

        <Grid item xs={12} className={classes.centerElems}>
          <Button
            color="primary"
            variant="contained"
          >Create Account</Button>
        </Grid>
      </Grid>
    </Paper>
    </ThemeProvider>
  )
}

/*
  return (
    <ThemeProvider theme={textFieldTheme}>
    <Paper className={classes.main}>
      <h1>Signup</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="First name" />
        </Grid>
        <Grid item xs={6}>
          <TextField size='small'  fullWidth={true} variant='outlined' label="Last name" />
        </Grid>
        <Grid item xs={12}>
          <TextField size='small'  type='email' fullWidth={true} variant='outlined' label="Email address" />
        </Grid>
        <Grid item xs={12}>
          <TextField size='small' fullWidth={true} type='password' variant='outlined' label="Password" />
        </Grid>
        <Grid item xs={12} className={classes.bdayLbl}><label >Date of birth</label></Grid>
        <Grid item xs={4}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel htmlFor="my-input">Day</InputLabel>
            <Select
              label='Day'
              value={day}
              onChange={handleChangeDay}
            >
              {Array.from(Array(31), (e,i) => i+1).map((x) => (
                <MenuItem key={x} value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel htmlFor="my-input">Month</InputLabel>
            <Select
              label='Month'
              value={month}
              onChange={handleChangeMonth}
            >
              {Array.from(Array(12), (e,i) => i+1).map((x) => (
                <MenuItem key={x} value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel htmlFor="my-input">Year</InputLabel>
            <Select
              label='Year'
              value={year}
              onChange={handleChangeYear}
            >
              {Array.from(Array(maximumProvenAge - minmumUserAge), (e,i) => (currentYear - minmumUserAge) - (i+1)).map((x) => (
                <MenuItem key={x} value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.centerElems}>
          <Button
            id="submitBtn"
            component="submit"
            color="primary"
            variant="contained"
          >Create Account</Button>
        </Grid>
      </Grid>
    </Paper>
    </ThemeProvider>
  )
*/