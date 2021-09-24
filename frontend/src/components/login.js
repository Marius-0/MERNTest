import {
  Grid, Paper, TextField, Button
} from '@material-ui/core';
import { get, post, postFunc } from '../services/fetch_crud.js'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  main: {
    width: '432px',
    margin: 'auto',
    padding: '16px'
  },
  btn: {
    fontWeight: '600',
    fontSize: '18px',
    padding: '8px',
    textTransform: 'none',
  },
})

export default function Login(){
  const classes = useStyles()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  function handleSubmit() {
    //const login_vars = document.forms['loginForm']
    post('http://localhost:3000/account/login', {
      email: email, //login_vars['email'].value,
      password: password//login_vars['password'].value
    })
  }

  let history = useHistory();

  async function handleAuth () {
    console.log('Hello myself, sir')
    const res = await postFunc('http://localhost:3000/account/login', {
      email: email, 
      password: password
    })
      .then(res => res.json())
      .then(data => history.push('/'))
      .catch(err => history.push('/login'))

    return res
  }

  return (
    <form name="loginForm">
    <Paper className={classes.main}>
       <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            name="email" 
            fullWidth={true} 
            variant='outlined' 
            label='Email address' 
            type='email'
            value={email}
            onChange={handleChangeEmail} />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            name="password" 
            fullWidth={true} 
            variant='outlined' 
            label='Password' 
            type='password'  
            value={password}
            onChange={handleChangePassword} />
        </Grid>

        <Grid item xs={12} >
          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            fullWidth={true}
            onClick={handleAuth}
          >Log In</Button>
        </Grid>
        <Grid item xs={12}>
          <a //TODO finish
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot password?
          </a>
        </Grid>
        <Grid item xs={12}>Don't have an account yet? <Link to="/signup">Sign Up</Link></Grid>
      </Grid>
      
    </Paper>
    </form>
  )
}
