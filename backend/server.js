import express from 'express'
import cors from 'cors'

import baseRouter from './routes/baseRoute.js'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path: './backend/.env'})

const uri = process.env.DB_URI;
const con = await mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(con => console.log(`Database connected : ${con.connection.host}`))
    .catch(err => console.error(`Database failed to connect, error : ${err}`));

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

import User from './models/usersModel.js'
import Post from './models/postModel.js'
import Comments from './models/commentModel.js'
import Chat from './models/postModel.js'


app.use('/api/users', new baseRouter(User).router)
app.use('/api/chats', new baseRouter(Chat).router)
app.use('/api/comments', new baseRouter(Comments).router)
app.use('/api/posts', new baseRouter(Post).router)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

export default app