import React from "react";
import "./head.scss";
import DropDownMenu, { MenuItem } from "../components/dropDown.js";
import moment from "moment";

const UserName = ({ name, userPageURL }) => (
  <a href={userPageURL} className="name">
    {name}
  </a>
);
const TimePosted = ({ time }) => (
  <div className="time">{moment(time).fromNow()}</div>
);
const Avatar = ({ initial, avatar, userPageURL }) => (
  <a href={userPageURL} className="avatar">
    <img alt={initial} src={avatar} />
  </a>
);

export { UserName, TimePosted, Avatar };

export default function Head({ postInfo, optionsMenu }) {
  return (
    <div className="head">
      <Avatar
        initial={postInfo.user.firstName[0]}
        avatar={postInfo.user.avatar}
        userPageURL={postInfo.userPageURL}
      />
      <UserName
        name={`${postInfo.user.firstName} ${postInfo.user.secondName}`}
        userPageURL={postInfo.userPageURL}
      />
      <TimePosted time={postInfo.createdAt} />

      <div className="options">
        <DropDownMenu>
          {optionsMenu.map((item, index) => (
            <MenuItem {...item} key={index} />
          ))}
        </DropDownMenu>
      </div>
    </div>
  );
}
