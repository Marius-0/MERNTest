import React from "react";
import moment from "moment";
import "./misc.scss";

const Text = ({ text, style, className }) => {
  return (
    <div style={style} className={className}>
      {text}
    </div>
  );
};

const Avatar = ({ avatarURL }) => {
  return (
    <div className="avatar">
      <img alt="user avatar" src={avatarURL} />
    </div>
  );
};
// onPressEnter
const TextArea = ({ onSubmit, placeholder = "", style }) => {
  function handleChange(e) {
    let comment = e.target.innerHTML;
    if (comment === "<br>") e.target.innerHTML = "";
  }

  function handlePressEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e.target.innerText);
      e.target.innerHTML = "";
    }
  }

  return (
    <div className="textbox">
      <div
        onInput={handleChange}
        onKeyDown={handlePressEnter}
        contentEditable
        data-text={placeholder}
        className="textarea"
      ></div>
    </div>
  );
};

const TimePosted = ({ time, style }) => (
  <div className="time">{moment(time).fromNow()}</div>
);

export { Text, Avatar, TextArea, TimePosted };
