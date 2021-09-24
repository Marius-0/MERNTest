import { Typography, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Grid, InputBase} from '@material-ui/core';
import moment from 'moment';
import React from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { FullscreenExit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  margin: {
    display: 'flex',
    margin: '12px',
    gap: '6px'
  },
  inputText: {
      backgroundColor: "rgb(240, 242,245)",
      borderRadius: "20px",
      padding: "10px",
      textTransform: "initial",
      justifyContent: "start",
      letterSpacing: "0.15px",
      fontSize: "16px",
      width: '100%',
      "&:active": {
        color: "black"
      }
  }
}))

export function NewComment () {
  const classes = useStyles()

  return (
    <div className={classes.margin}>
      <Avatar>R</Avatar>
      <InputBase 
        className={classes.inputText} 
        placeholder="Write a comment..."
        multiline/>

    </div>
  )
}

export default function Comment({ user, text, time }){
  const getTime = time_var => moment( time_var ).fromNow();

  return (
      <ListItem 
        alignItems="flex-start"
        divider={true}
        disableGutters={true}
        >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="../static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                {user}
              </Typography>
              {' • ' + getTime(time)}
            </>
          }
          primary={text}
        />
      </ListItem>
  )
}

      /*

        */