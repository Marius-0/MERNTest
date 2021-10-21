import TagFacesIcon from "@material-ui/icons/TagFaces";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import monkey from "../static/api.jpg";

import UserContext from "../contexts/user.js";

import {
  Card,
  CardActions,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import React, { useContext } from "react";
import PostDialog from "./post_dialog.js";

const useStyles = makeStyles({
  root: {
    width: 500,
    textAlign: "left",
    margin: "10px 0px",
  },

  avatar: {
    backgroundColor: red[500],
    marginRight: "8px",
  },
  actionsBar: {
    justifyContent: "space-evenly",
    borderTop: "1px solid lightgray",
    margin: "0px 16px",
  },
  actions: {
    fontSize: 16,
    textIndent: 4,
    flexGrow: 1,
    padding: "8px",
    borderRadius: "5%",
  },
  inputText: {
    width: "100%",
    backgroundColor: "rgb(240, 242,245)",
    borderRadius: "50px",
    paddingBottom: "2px",
    paddingLeft: "8px",
    color: "rgba(128,128,128,0.8)",
    textTransform: "initial",
    justifyContent: "start",
    letterSpacing: "0.15px",
    fontSize: "16px",
  },
  head: {
    margin: "16px",
    display: "flex",
  },
});

export default function CreatePost({ onOpen }) {
  const classes = useStyles();
  const userInfo = useContext(UserContext);

  return (
    <Card className={classes.root}>
      <div className={classes.head}>
        <Avatar aria-label="recipe" src={monkey} className={classes.avatar} />

        <Button
          className={classes.inputText}
          id="btn_createPost"
          disableRipple
          onClick={onOpen}
        >
          {`What's on your mind ${userInfo.name}?`}
        </Button>
      </div>
      <CardActions className={classes.actionsBar}>
        <IconButton aria-label="tag" className={classes.actions}>
          <TagFacesIcon /> Tag
        </IconButton>
        <IconButton aria-label="link" className={classes.actions}>
          <LinkIcon /> Link
        </IconButton>
        <IconButton aria-label="imags" className={classes.actions}>
          <ImageIcon /> Images
        </IconButton>
      </CardActions>
    </Card>
  );
}
