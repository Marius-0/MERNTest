import React, { useEffect, useState } from 'react'
import { get, post } from '../services/fetch_crud.js'
import { makeStyles } from '@material-ui/core/styles';

import PostList from './post.js';
import MakePost from './create_post.js';
import PostDialog from './post_dialog.js';
import PrimarySearchAppBar from './appbar.js';

const useStyles = makeStyles((theme = null) => ({
	main: {
		'& > *': {
			marginRight: 'auto',
			marginLeft: 'auto'
		}
	}
}));

export default function Homepage() {
	const classes = useStyles();
	
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	
	const [posts, setPosts] = useState([]);
	const removePost = (id) => setPosts(posts.filter(x => id !== x._id))

	useEffect(() => {
		get('http://localhost:3000/api/posts')
			.then(items => setPosts(items))
	}, [posts.length])

	const handlePost = (data) => {
		post('http://localhost:3000/api/posts', data)
		.then(response => {
			setPosts([response, ...posts])
		});
	}

	return (
    <>
      <PrimarySearchAppBar/>
      <div className={classes.main}>
        <MakePost onOpen={handleOpen} />
        <PostDialog open={open} onClose={handleClose} onPost={handlePost} />
        <PostList posts={posts} removePost={removePost} />
      </div>
    </>
	)
}
