import asyncHandler from 'express-async-handler'

import express from 'express'
const router = express.Router()

const get = (request, response, next, model) => {
  const query = model.find().exec()
  query.then((resource) => {

    // order not found, let's throw an error
    if (!resource) {
      return next(errors.RESOURCE_NOT_FOUND())
    }

    // we found an order
    return response.json(resource)
  })
    .catch((err) => {
      // send the error to the error handler
      return next(err)
    })
}

const getById = (request, response, next, model) => {
  const query = model.findById(request.params.id).exec()
  query.then((resource) => {

    // order not found, let's throw an error
    if (!resource) {
      return next(errors.RESOURCE_NOT_FOUND())
    }

    // we found an order
    return response.json(resource)
  })
    .catch((err) => {
      // send the error to the error handler
      return next(err)
    })
}

const create = (request, response, next, model) => {
  const obj = model.create(request.body)
       obj.then((resource) => {
           return response.json(resource)
       })
       .catch((err) => {
           // send the error to the error handler
           return next(err)
       })
}

export {
  get, getById, create
}