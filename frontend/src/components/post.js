import Comment from "./comment.js";
import { NewComment } from "./comment.js";

import {
  MoreHoriz,
  ThumbUpOutlined,
  ThumbUp,
  ChatBubbleOutline,
  LooksOneSharp,
} from "@material-ui/icons";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  List,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "../static/flickity copy.css";

import Flickity from "react-flickity-component";
import axios from "axios";

import UserContext from "../contexts/user.js";

// import {get, post} from '../services/fetch_crud.js'

const colorOne = "#f0f2f5";
const colorTwo = "#bbb";
const lineColor = "#ced0d4";

const img_dim = "32px";

const space = "8px";
const roundness = "6px";

const useStyles = makeStyles({
  main: {
    width: "500px",
    textAlign: "left",
    margin: "10px 0px",
  },
  postText: {
    fontSize: 14,
    paddingTop: 0,
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionsBar: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0px 16px",
    padding: "4px 0px",
    gap: "4px",
  },
  actions: {
    fontSize: 16,
    textIndent: 4,
    flexGrow: 1,
    padding: "8px",
    borderRadius: "4px",
  },
  divider: {
    backgroundColor: "lightgray",
    border: "none",
    margin: "0px 16px",
    height: "1px",
  },
  moreMenu: {
    "& ul": {
      padding: "4px 6px",
    },
    "& li:first-child": {
      color: "red",
    },
    "& li": {
      justifyContent: "center",
      padding: "6px 40px",
      font: "600",
      textTransform: "capitalize",
      borderRadius: "4px",
    },
    "& hr": {
      margin: "4px 0px",
    },
  },
  likeCount: {
    margin: "0px 16px",
    padding: "10px 0px",
    "& > *": {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      alignItems: "center",
      "& > *": {
        display: "flex",
        backgroundColor: "skyblue",
        borderRadius: "50px",
        padding: "4px",
        justifyContent: "center",
        width: "24px",
        "& > *": {
          color: "white",
          width: "80%",
        },
      },
    },
  },
  head: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gridTemplateRows: "1fr auto auto",
    gap: `0px ${space}`,
    gridAutoFlow: "row",
    gridTemplateAreas: `
      avatar name options
      avatar time options`,
    margin: space,
    avatar: {
      gridArea: "avatar",
      "& img": {
        borderRadius: roundness,
        display: "block",
      },
    },
    name: {
      gridArea: "name",
      fontSize: "16px",
      fontWeight: "600",
    },
    time: {
      gridArea: "time",
      fontSize: "14px",
      color: "#bbb",
    },
    options: {
      gridArea: "options",
      borderRadius: "100%",
      width: "40px",
      "&:hover": {
        backgroundcolor: colorOne,
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& span": {
        width: "50%",
        height: "50%",
        backgroundimage: `url(
          "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 32.055 32.055' style='enable-background:new 0 0 32.055 32.055;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z'/%3E%3C/g%3E%3C/svg%3E"
        )`,
      },
    },
  },
});

const PostHead = ({ imgSrc, userName, timePosted }) => {
  const classes = useStyles();

  return (
    <div className={classes.head}>
      <div className={classes.avatar}>
        <img alt="userAvatar" src={imgSrc} />
      </div>
      <div className={classes.name}>{userName}</div>
      <div className={classes.time}>{timePosted}</div>
      <div className={classes.options}>
        <span />
      </div>
    </div>
  );
};

function PostMenu({ id, removePost }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    removePost(id);
    handleClose();
  };
  const handleEdit = () => handleClose();
  const handleHide = () => handleClose();

  return (
    <>
      <IconButton
        aria-controls="post-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.moreMenu}
      >
        <MenuItem onClick={handleDelete}>delete</MenuItem>
        <Divider />
        <MenuItem onClick={handleEdit}>edit</MenuItem>
        <MenuItem onClick={handleHide}>hide</MenuItem>
      </Menu>
    </>
  );
}

function Carousel({ media }) {
  const flickityOptions = {};

  return (
    <Flickity className="carousel" options={flickityOptions}>
      {media.map((item, index) => (
        <div className="carousel-cell" key={index}>
          <img src={item} alt="" />
        </div>
      ))}
    </Flickity>
  );
}

function Post({
  _id,
  media,
  userID,
  createdAt,
  text,
  likes,
  comments,
  removePost,
}) {
  const classes = useStyles();
  const userInfo = useContext(UserContext);

  const getTime = (time_var) => moment(time_var).fromNow();
  const [likeStatus, setLike] = useState(likes.includes(userInfo.id));

  const [showComment, setShowComment] = useState(false);
  const handleShowComment = () => setShowComment(true);

  const [commentList, setCommentList] = useState(comments);
  const handlePostComment = (comment) => {
    console.log(comment);
    setCommentList([comment, ...commentList]);
  };

  useEffect(() => {}, []);

  const handleToggleLike = () => {
    axios
      .patch(
        `http://localhost:3000/api/posts/${_id}/like`,
        { userId: userInfo.id, like: !likeStatus },
        { withCredentials: true }
      )
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));

    if (!likeStatus) {
      likes.push(userInfo.id);
    } else {
      let index = likes.indexOf(userInfo.id);
      if (index !== -1) {
        likes.splice(index, 1);
      }
    }
    setLike((likeStatus) => !likeStatus);
  };

  const logData = () =>
    console.log(
      `id: ${_id} | media: ${media} | user: ${userID} | time: ${createdAt} | text: ${text} | likes: ${likes} | comments: ${comments}`
    );

  return (
    <Card className={classes.main}>
      <CardHeader
        avatar={
          <Avatar aria-label="avatar" className={classes.avatar}>
            R
          </Avatar>
        }
        action={<PostMenu id={_id} removePost={removePost} />}
        title={userID}
        subheader={getTime(createdAt)}
      />

      <CardContent className={classes.postText}>
        <Typography color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>

      {media.length > 0 ? (
        <Carousel media={media} />
      ) : (
        <hr className={classes.divider} />
      )}
      {likes.length > 0 && (
        <>
          <CardContent className={classes.likeCount}>
            <Typography color="textSecondary">
              <div className={classes.parentThumbCount}>
                <ThumbUp className={classes.thumbCount} />
              </div>
              {likes.length}
            </Typography>
          </CardContent>
          <hr className={classes.divider} />
        </>
      )}

      <div className={classes.actionsBar}>
        <IconButton
          aria-label="like"
          className={classes.actions}
          onClick={handleToggleLike}
        >
          {likeStatus ? <ThumbUp /> : <ThumbUpOutlined />}
        </IconButton>
        <IconButton
          aria-label="comment"
          className={classes.actions}
          onClick={handleShowComment}
        >
          <ChatBubbleOutline />
        </IconButton>
      </div>
      {showComment && (
        <>
          <hr className={classes.divider} />
          {<NewComment updateCommentList={handlePostComment} postID={_id} />}
        </>
      )}
      {commentList.length > 0 && (
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            Comments {commentList.length}
          </Typography>
          <List dense={true}>
            {commentList.map((comment) => (
              <Comment {...comment}></Comment>
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
}

export default function PostList({ posts, removePost }) {
  console.log(posts);
  return (
    <>
      {posts
        .sort((a, b) => a.createdAt < b.createdAt)
        .map((post) => (
          <Post key={post._id} {...post} removePost={removePost}></Post>
        ))}
    </>
  );
}
