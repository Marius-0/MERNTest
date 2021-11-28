import moment from "moment";
import Carousel from "./components/media";
import { ThumbsUp, ChatBubble } from "./components/icons";
import { Comment, NewComment } from "./components/interactions";
import { Text } from "./components/misc";
import "./post.scss";
import Head from "./components/head";
import React from "react";

import UserContext from "../contexts/user.js";
import axios from "axios";
import { AddComment } from "@material-ui/icons";

export default function Post({ posts }) {
  console.log("le post", posts);
  const userInfo = React.useContext(UserContext);
  function handleSubmitComment(value) {
    console.log(value);
  }

  function postComment(textBody, postID) {
    /*
    axios.post("http://localhost:3000/api/comments", {
      user: userInfo.id,
      postID: postID,
      body: textBody,
    });
    */
    console.log(postID, textBody);
  }

  const optionsMenuItems = [
    { title: "Home", operation: () => console.log("Hello") },
    { title: "About" },
    { isDivider: true },
    { title: "Delete", style: { color: "red" } },
  ];

  return (
    <div className="postFeed">
      {posts.map((post, index) => (
        <div className="container" key={index}>
          <Head
            postInfo={{
              user: post.user,
              createdAt: post.createdAt,
              text: post.text,
            }}
            optionsMenu={optionsMenuItems}
          />
          <Text text={post.text} className="postText" />
          <Carousel media={post.media} />
          <div className="interaction">
            <ThumbsUp />
            <ChatBubble />
          </div>

          <NewComment
            postID={post._id}
            onSubmitComment={postComment}
            userAvatarURL={userInfo.avatarURL}
          />
          {post.comments.map((comment, index) => (
            <Comment {...comment} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}

/*

<div className="new_comment">
            <img alt="user avatar" src={users[0].avatarURL} />
            <TextArea onEnter={handleEnter} placeholder="Post a comment..." />
          </div>

<div className="head">
            <Avatar avatarURL={post.avatarURL} />
            <Text text={post.name} />
            <TimePosted time={post.time} />

            <div className="options">
              <DropDownMenu>
                <MenuItem title="Home" />
                <MenuItem title="About" />
                <MenuItem isDivider />
                <MenuItem title="Delete" style={{ color: "red" }} />
              </DropDownMenu>
            </div>
          </div>
*/
