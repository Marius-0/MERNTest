import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/user.js";

const useStyles = makeStyles({});

export default function PostDialog({ open, onClose, onPost }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [userValues, setUserValues] = useState("");

  const handlePostBodyChange = (event) => setValue(event.target.value);
  const userInfo = useContext(UserContext);

  const handlePost = () => {
    onPost({
      text: value,
      user: userInfo.name,
    });
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create new post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            className={classes.inputText}
            id="tf_postBody"
            placeholder={"What's on your mind " + userInfo.name + "?"}
            multiline
            onChange={handlePostBodyChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePost}>Post</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
