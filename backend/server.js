import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"

import baseRouter from './routes/baseRoute.js'
import userRoute from './routes/userRoute.js'
import accountRouter from './routes/accountRouter.js'
import authorization from './middleware/auth.js'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './backend/.env' })

const uri = process.env.DB_URI;
const con = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(con => console.log(`Database connected : ${con.connection.host}`))
    .catch(err => console.error(`Database failed to connect, error : ${err}`));

const app = express()

var whitelist = ['http://localhost:3000']
var corsOpt = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

import User from './models/usersModel.js'
import Post from './models/postModel.js'
import Comments from './models/commentModel.js'
import Chat from './models/postModel.js'


// const auth = (req, res, next) => {
//     const token = req.cookies.access_token
//     if (!token) {
//         return res.sendStatus(403)
//     }
//     try {
//         const data = jwt.verify(token, process.env.TOKEN_KEY)
//         req.userId = data.id
//         req.userRole = data.role
//         return next()
//     } catch {
//         return res.sendStatus(403)
//     }
// }


app.use('/account', accountRouter)

app.use('/api/users', authorization, userRoute)
app.use('/api/chats', authorization, new baseRouter(Chat).router)
app.use('/api/comments', authorization, new baseRouter(Comments).router)
app.use('/api/posts', authorization, new baseRouter(Post).router)

// app.get('/protected', authorization, (req, res) => {
//     return res.json({ user: { id: req.userId, email: req.userEmail, role: req.userRole } })
// })


const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

export default app