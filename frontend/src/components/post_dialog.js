import {
    Dialog, DialogTitle, DialogActions, DialogContentText, Button, TextField, DialogContent, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';

const useStyles = makeStyles({

});

export default function PostDialog({ open, onClose, onPost, user }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handlePostBodyChange = (event) => setValue(event.target.value)

    const handlePost = () => {
      onPost({
        text: value,
        user: user
      });
      onClose()
    }

    const userName = useContext(UserContext)

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Create new post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField className={classes.inputText}
              id="tf_postBody"
              placeholder={"What's on your mind " + user + "?"}
              multiline
              onChange={handlePostBodyChange} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePost}>Post</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
}