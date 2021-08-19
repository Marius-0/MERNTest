import './App.css';

// import { data } from './data.js';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import PostList from './components/post.js';
import MakePost from './components/create_post.js';
import PostDialog from './components/new_post_dialog.js';
import PrimarySearchAppBar from './components/appbar.js';

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
		width: '100%',
		backgroundColor: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
	color: {
		backgroundColor: "#fff",
		color: "#000"
	}
}));

function Feed() {
	const [posts, setPosts] = useState([]);

	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
		console.log('Opened')
	}
	const handleClose = () => setOpen(false)

	const addPost = (newPost) => setPosts([newPost, ...posts])
	const removePost = (id) => setPosts(posts.filter(x => id !== x.id))

	async function getItems() {
		const data = await fetch('http://localhost:5000/api/posts')
			.then(data => data.json())
			.catch(error => {console.error('Error occured when fetching posts:', error)});
		return data;
	}

	useEffect(async () => {
		await getItems()
			.then(items => setPosts(items))
	}, [posts.length])

	async function postData(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return response.json(); 
	}

	const handlePost = (data) => {
		postData('http://localhost:5000/api/posts', data)
		.then(response => {
			setPosts([response, ...posts])
		});
		handleClose()
	}

	return (
		<>
			<MakePost onOpen={handleOpen} user="Kangey"/>
			<PostDialog open={open} onClose={handleClose} onPost={handlePost} user="Kangey" />
			<PostList posts={posts} />
		</>
	)
}

function App() {
	const classes = useStyles();
	const [newPostAlert, setNewPostAlert] = useState(0);



	return (
		<div className="App">
			<PrimarySearchAppBar></PrimarySearchAppBar>
			<Feed/>
		</div>
	);
}

export default App;

/*
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const getData = async() => {
    const res = await axios.get('/api/users')
    setUsers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])
 
  return (
    <div>
      {users.map(u => <h4 key={u._id}>displayName : {u.displayName}</h4>)}
    </div>
  )
}

export default App


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

			<div className={classes.root}>
				<AppBar position="static" className={classes.colorch}>
					<Toolbar className={classes.colorch} >
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
			</div>
*/