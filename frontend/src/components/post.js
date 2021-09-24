import Comment from './comment.js';
import {NewComment} from './comment.js';

import { MoreVert, ThumbUpOutlined, ThumbUp, ChatBubbleOutline } from '@material-ui/icons';
import {
  Card, CardHeader, CardContent, Typography, CardActions,
  List, Avatar, IconButton, Menu, MenuItem, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import '../static/flickity copy.css'

import Flickity from 'react-flickity-component'

// import {get, post} from '../services/fetch_crud.js'

const useStyles = makeStyles({
  main: {
    width: '500px',
    textAlign: 'left',
    margin: "10px 0px"
  },
  postText: {
    fontSize: 14,
    paddingTop: 0,
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: "0px 16px",
    padding: "4px 0px",
    gap: "4px"
  },
  actions: {
    fontSize: 16,
    textIndent: 4,
    flexGrow: 1,
    padding: "8px",
    borderRadius: "4px"
  },
  divider: {
    backgroundColor: "lightgray",
    border: "none",
    margin: "0px 16px",
    height: "1px"
  }
});

function PostMenu({ id, removePost }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    removePost(id)
    handleClose()
  }

  return (
    <>
      <IconButton aria-controls="post-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  )
}

function Carousel({ media }) {
  const flickityOptions = {}
  
  return (
    <Flickity
      className='carousel'
      options={flickityOptions}
    >
      {media.map((item, index) => (
        <div className="carousel-cell" key={index}>
          <img src={item} alt=""/>
        </div>
        ))}
    </Flickity>
  )
}

function Post({ _id, media, userID, createdAt, text, likes, comments, removePost }) {
  const classes = useStyles();
  const getTime = time_var => moment(time_var).fromNow();
  const [likeStatus, setLike] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = () => setShowComment(true)
  const handleToggleLike = () => setLike(!likeStatus)

  const logData = () => console.log(`id: ${_id} | media: ${media} | user: ${userID} | time: ${createdAt} | text: ${text} | likes: ${likes} | comments: ${comments}`)

  return (
    <Card className={classes.main}>
      {logData()}
      <CardHeader
        avatar={<Avatar aria-label="avatar" className={classes.avatar}> R </Avatar>}
        action={<PostMenu id={_id} removePost={removePost} />}
        title={userID}
        subheader={getTime(createdAt)}
      />

      <CardContent className={classes.postText}>
        <Typography color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
      
      
      {media.length > 0
        ? <Carousel media={media} />
        : <hr className={classes.divider}/>
      }
      {likes.length > 0 &&
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            Likes {likes.length}
          </Typography>
        </CardContent>
      }
      
      <div className={classes.actionsBar}>
        <IconButton aria-label="like" className={classes.actions} onClick={handleToggleLike}>
          {likeStatus ? <ThumbUpOutlined /> : <ThumbUp />}
        </IconButton>
        <IconButton aria-label="comment" className={classes.actions} onClick={handleShowComment}>
          <ChatBubbleOutline />
        </IconButton>
      </div>
      {showComment &&
        <>
          <hr className={classes.divider}/>
          <NewComment />
        </>
      }
      {comments.length > 0 &&
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            Comments {comments.length}
          </Typography>
          <List dense={true}>
            {comments.slice(0, 2).map((comment) => (
              <Comment {...comment}></Comment>
            ))}
          </List>
        </CardContent>
      }
    </Card>
  )
}

export default function PostList({ posts, removePost }) {
  return (
    <>
      {posts
        .sort((a, b) => a.createdAt < b.createdAt)
        .map((post) => (
          <Post key={post._id} {...post} removePost={removePost}></Post>
        ))}
    </>
  )
}
