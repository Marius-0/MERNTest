import { ThumbsUp, ChatBubble } from "./icons.js";
import "./interactions.scss";
import moment from "moment";
import React from "react";
import { TextArea } from "../components/misc";

const Comment = ({ user, time, text }) => {
  return (
    <div className="comment">
      <img alt="user avatar" src={user.avatar} />
      <div>
        <span>
          <span className="text-bold">{`${user.firstName} ${user.secondName}`}</span>
          <span className="text-secondary"> • {moment(time).fromNow()}</span>
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};

const NewComment = ({ onSubmitComment, postID, userAvatarURL }) => {
  function handleComment(value) {
    onSubmitComment(value, postID);
  }

  return (
    <div className="new_comment" id="new_comment">
      <img alt="user avatar" src={userAvatarURL} />
      <TextArea placeholder="Post a comment..." onSubmit={handleComment} />
    </div>
  );
};

export { Comment, NewComment };

export default function Interactions(props) {
  const url = "https://source.unsplash.com/GgrOzPKZgRc/40x40";

  return props.children;
}
