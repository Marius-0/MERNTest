import { Typography, ListItem, ListItemAvatar, ListItemText, Divider, Avatar} from '@material-ui/core';
import moment from 'moment';
import React from 'react';

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
