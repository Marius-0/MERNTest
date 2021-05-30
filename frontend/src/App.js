import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import { white } from '@material-ui/core/colors';
import { data } from './data.js';
import moment from 'moment';
import React from 'react'
import Post from './components/post.js';
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

function App() {
	const classes = useStyles();

	return (
		<div className="App">
			<PrimarySearchAppBar></PrimarySearchAppBar>
			{data.map((post) => (
				<Post {...post}></Post>
			))}
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