import asyncHandler from 'express-async-handler'
import User from './../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import express from 'express'
import authorization from '../middleware/auth.js'

const router = express.Router();

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randAlphaNumStr(strLen) {
  if(strLen <= 0)
    return ''
  else
    randAlphaNumStr(strLen - 1) + chars[Math.floor(Math.random() * chars.length)];
}

router.post('/signup', asyncHandler(async (req, res, next) => {
  try {
    const {firstName, email, password, dateOfBirth} = req.body
    if (!(email && password && firstName)) {
      res.status(400).send('All input is required')
    }

    const oldUser = await User.findOne({ email: email })

    if (oldUser) {
      return res.status(409).send('User Already Exists. Please Login')
    }

    const encyptedPassword = await bcrypt.hash(password, 10)

    const bday = new Date(dateOfBirth);
    const accountNo = bday.toISOString().slice(0,10).split('-').join('').slice(2) + randAlphaNumStr(4);	
    //bday.toISOString().replaceAll('-', '').slice(2, 8) + randAlphaNumStr(4);	

    //req.body
    const user = await User. create(
      {
        ...req.body,
      'accountNumber': accountNo,
      'password': encyptedPassword
      }
    )

    const token = jwt.sign(
      { id: user._id, email },
        process.env.TOKEN_KEY,
      { expiresIn: '30d'},
    )

    user.token = token

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production'
      })
      .status(201)
      .json(user)

  } catch (err) {
    console.log(err)
  }
}))

router.post('/login', asyncHandler(async(req, res, next) => {
  console.log('new login')
  try {
    const { email, password } = req.body

    console.log('e&p', email, password)

    if (!(email && password)) {
      res.status(400).send('Email or password is incorrect')
    }

    const user = await User.findOne({ email: email })

    if(user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email, firstName: user.firstName, role: user.role },
        process.env.TOKEN_KEY,
        { expiresIn: '30d' }
      )

      //user.token = token
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == 'production'
        })
        .status(200)
        .json({ message: 'Logged in successfully' })
    } else {
      res.status(400).send('Invalid Credentials')
    }
  } catch (err) {
    console.log(err)
  }
}))

router.post('/logout', authorization, (req, res) => {
  return res
      .clearCookie('access_token')
      .status(200)
      .send({ message: 'Sucessfully logged out' })
})

router.get('/info', authorization, (req, res) => {
  const name = req.firstName
  
  return res.send(name)
})

export default router
