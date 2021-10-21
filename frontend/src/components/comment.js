import moment from "moment";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Grid,
  InputBase,
} from "@material-ui/core";
import React, { useContext, useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import UserContext from "../contexts/user";

import monkey from "../static/api.jpg";

import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const useStyles = makeStyles((theme) => ({
  margin: {
    display: "flex",
    margin: "10px 16px",
    gap: "6px",
  },
  inputText: {
    backgroundColor: "rgb(240, 242,245)",
    borderRadius: "20px",
    padding: "10px",
    textTransform: "initial",
    justifyContent: "start",
    letterSpacing: "0.15px",
    fontSize: "16px",
    width: "100%",
    "&:active": {
      color: "black",
    },
  },
}));

export function NewComment({ updateCommentList, postID }) {
  let textInput = useRef(null);
  const userInfo = useContext(UserContext);
  const [commentText, setCommentText] = useState();
  const handleCommentText = (e) => setCommentText(e.target.value);
  const classes = useStyles();

  console.log("befComment:", commentText, userInfo.id, postID);

  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // axios
      //   .patch(
      //     `http://localhost:3000/api/posts/${postID}/comment`,
      //     {
      //       userID: userInfo.id,
      //       userName: userInfo.name,
      //       body: commentText,
      //     },

      axios
        .post(
          `http://localhost:3000/api/comments`,
          {
            user: userInfo.id,
            postID: postID,
            body: commentText,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("post comment: ", res);
          setCommentText("");
        })
        .catch((err) => console.error(err));

      updateCommentList({
        user: { firstName: userInfo.name },
        body: commentText,
        createdAt: new Date(),
      });
    }
  };

  return (
    <div className={classes.margin}>
      <Avatar>R</Avatar>
      <InputBase
        className={classes.inputText}
        placeholder="Write a comment..."
        multiline
        onKeyDown={handleSubmitComment}
        onChange={handleCommentText}
        value={commentText}
      />
    </div>
  );
}

export default function Comment({ user, body, createdAt }) {
  const getTime = (time_var) => moment(time_var).fromNow();

  return (
    <ListItem alignItems="flex-start" divider={true} disableGutters={true}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={monkey} />
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
              {`${user.firstName} ${user.secondName ?? ""}`}
            </Typography>
            {" • " + getTime(createdAt)}
          </>
        }
        primary={body}
      />
    </ListItem>
  );
}
