import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import React, { createContext, useEffect, useState } from 'react'


import Signup from './components/signup.js'
import Login from './components/login.js'
import Homepage from './components/homepage.js'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom'
import { get } from './services/fetch_crud.js';

import UserProvider from './components/userContext'

function App() {
	const API_URL = 'localhost:5000'
	const [userInfo, setUserInfo] = useState(null)

	useEffect(() => {
		setUserInfo(get(API_URL + '/account/info'))
	}, [])

	//const UserContext = createContext('Username')

	return (
		<Router>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/" >
					{!userInfo ? <Redirect to="/login" /> : 
						<UserProvider value={userInfo}>
							<Homepage />
						</UserProvider>
					}
				</Route>
			</Switch>
		</Router>
	)
}

export default App;
