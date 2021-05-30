import Comment from './comment.js';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Like from '@material-ui/icons/ThumbUpAltOutlined';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';

import { Card, CardHeader, CardMedia, CardContent, Typography, CardActions, 
					List, Avatar, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import React, {useState} from 'react'

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

export default function PhotoPost({media, user, time, text, likes, comments}){
  const classes = useStyles();
	const [imgIndex, setImgIndex] = useState(0);
  const getTime = time_var => moment( time_var ).fromNow();

  function nextImg(e) {
    e.preventDefault();
    let nextIndex = (imgIndex + 1) % (media.length);
    e.currentTarget.children[imgIndex].style.display = 'none';
    e.currentTarget.children[nextIndex].style.display = 'block';
    setImgIndex(nextIndex);
  }

  function getStyle(index){ 
    if(index > 0)
      return {display: 'none'};
    return {display: 'block'};
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title = {user}
        subheader = {getTime(time)}
      />
      <CardContent className={classes.postText}>
        <Typography color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
      <div id="carousel" className={classes.gridList} onClick={nextImg}>
        {media.map((item, index) => (
          <img src={item.url} alt={item.title} className={classes.gridImg} style={getStyle(index)} loading="lazy"/>
        ))}
        <div className={classes.imgNum}>{(imgIndex + 1)+'/'+media.length}</div>
      </div>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          Likes {likes.length}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionsBar}>
        <IconButton aria-label="like">
          <Like />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
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
    </Card>
  )
}