import {
    Dialog, DialogTitle, DialogActions, DialogContentText, Button, TextField, DialogContent, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({

});

export default function CreatePostDialog({ open, onClose, onPost, user }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleClose = () => onClose();

    const handlePostBodyChange = (event) => {
      setValue(event.target.value)
    }

    const handlePost = () => {
      onPost({
        text: value,
        user: user
      });
    }

    return (
      <Dialog onClose={handleClose} open={open}>
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
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      /*
        <Card className={classes.root}>
            <div className={classes.head}>
                <Avatar aria-label="recipe" src={monkey} className={classes.avatar}/>
                <InputBase className={classes.inputText}
                    id="tf_createPost"
                    placeholder={"What's on your mind " + user + "?"}
                    multiline />
            </div>
            <CardActions className={classes.actionsBar}>
                <IconButton aria-label="tag" className={classes.actions}>
                    <TagFacesIcon/> Tag
                </IconButton>
                <IconButton aria-label="link" className={classes.actions}>
                    <LinkIcon/> Link
                </IconButton>
                <IconButton aria-label="imags" className={classes.actions}>
                    <ImageIcon/> Images
                </IconButton>
            </CardActions>
        </Card>
        */
    )
}