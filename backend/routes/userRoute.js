import express from 'express'
const router = express.Router()

import asyncHandler from 'express-async-handler'
//import { getById } from '../controllers/userController.js'

import * as base from '../controllers/baseContoller.js'
import User from '../models/usersModel.js'

router.route('/').get(
  //middleware.authenticate,
  (request, response, next) => {
    base.get(request, response, next, User)
  })

router.route('/:id').get(
  //middleware.authenticate,
  (request, response, next) => {
    base.getById(request, response, next, User)
  })

router.route('/').post(
  //middleware.authenticate,
  (request, response, next) => {
    base.create(request, response, next, User)
  })


// express router method to create route for getting users by id
//router.route('/:id').get(getById)

export default router