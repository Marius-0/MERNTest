import Comment from './comment.js';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import LikeEmpty from '@material-ui/icons/ThumbUpOutlined';
import Like from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';

import { Card, CardHeader, CardContent, Typography, CardActions, 
					List, Avatar, IconButton, Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import React, {useEffect, useState} from 'react'

// import {get, post} from '../services/fetch_crud.js'

const useStyles = makeStyles({
  root: {
    width: 500,
		textAlign: 'left',
    margin: "10px 0px"
  },
	media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  postText: {
    fontSize: 14,
		paddingTop: 0,
  },
  commentStyle: {
		backgroundColor: 'lightgray',
  },
	avatar: {
    backgroundColor: red[500],
  },
	actionsBar: {
		justifyContent: 'space-evenly',
		borderTop: "1px solid lightgray",
		borderBottom: "1px solid lightgray",
		margin: "0px 16px"
	},
	medias: {
		margin: "0px 16px"
	},
	gridList: {
		maxHeight: 585,
		width: 468,
    margin: "0px 16px"
	}, 
	gridImg: {
    maxHeight: 585,
		objectFit: "contain",
		height: "100%",
		width: "100%",
    overflow: 'scroll',
	},
  imgNum: {
    float: 'right',
    position: 'relative',
    bottom: '35px',
    right: '10px',
    color: 'lightgray',
    fontSize: '16px',
  }
});

function PostMenu(ObjectID){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDelete = async() => {
    await fetch(`http://localhost:5000/api/posts/${ObjectID.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    handleClose()
  }

  return(
    <>
      <IconButton aria-controls="post-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
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

function Post({_id, media, userID, createdAt, text, likes, comments}){
  const classes = useStyles();
	const [imgIndex, setImgIndex] = useState(0);
  const getTime = time_var => moment( time_var ).fromNow();
  const [likeStatus, setLike] = useState(false);

  const handleToggleLike = () => {
    setLike(!likeStatus)
  }

  function nextImg(e) {
    e.preventDefault();
    let nextIndex = (imgIndex + 1) % (media.length);
    e.currentTarget.children[imgIndex].style.display = 'none';
    e.currentTarget.children[nextIndex].style.display = 'block';
    setImgIndex(nextIndex);
  }

  const logData = () => console.log(`id: ${_id} | media: ${media} | user: ${userID} | time: ${createdAt} | text: ${text} | likes: ${likes} | comments: ${comments}`)

  function toggleLike() {
    const url = `http://localhost:5000/api/posts/${_id.id}`
    const params = { 'userID': userID }
    fetch(url, {
      method: "PATCH",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        
      })
    })
  }
  /*
  async function getItems() {
		const data = await fetch('http://localhost:5000/api/posts/')
			.then(data => data.json())
			.catch(error => {console.error('Error occured when fetching posts:', error)});
      console.log('data:', data);
		return await data;
	}

  useEffect(() => {
		let mounted = true;
		getItems()
			.then(data => {
				if(mounted) {
					if(data.likes.includes(userID))
            setLike(true)
				}
			})
		return () => mounted = false;
	}, [])
  */
  function handleLikeStatus() {
    const url = `http://localhost:5000/api/posts/${_id.id}`;
    fetch(url, {
      method: "GET",
      headers:{
        "Content-type": "application/json"
      },
    }).then(data => {
      
    })
  }
  
  return (
    <Card className={classes.root}>
      {logData()}
      <CardHeader
        avatar={ <Avatar aria-label="avatar" className={classes.avatar}> R </Avatar> }
        action={ <PostMenu id={_id} /> }
        title = {userID}
        subheader = {getTime(createdAt)}
      />
      
      <CardContent className={classes.postText}>
        <Typography color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>

      {media.length > 0 &&
        <div id="carousel" className={classes.gridList} onClick={nextImg}>
          {media.map((item, index) => (
            <img src={item.url} alt={item.title} className={classes.gridImg} style={{display: index > 0 ? "none" : "block"}} loading="lazy"/>
          ))}
          <div className={classes.imgNum}>{(imgIndex + 1)+'/'+media.length}</div>
        </div>
      }
      {likes.length > 0 &&
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            Likes {likes.length}
          </Typography>
        </CardContent>
      }
      <CardActions className={classes.actionsBar}>
        <IconButton aria-label="like" onClick={handleToggleLike}>
          {likeStatus  ? <LikeEmpty /> : <Like />}
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
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

export default function PostList({posts}){
  //const [posts, setPosts] = useState([]);
  console.log('posts:', posts);



  return(
    <>
      {posts.map((post) => (
        <Post key={post._id} {...post}></Post>
      ))}
    </>
  )
}

