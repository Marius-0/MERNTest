import asyncHandler from 'express-async-handler'
import express from 'express'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;

export default class baseRouter {
  constructor(model) {
    this.model = model;
  }

  get router() {
    const router = express.Router();

    router.all('/', asyncHandler(async (request, response, next) => {
      next()
    }))

    router.get('/', asyncHandler(async (request, response, next) => {
      console.log('get');
      await this.model.find().exec()
        .then(resource =>  response.json(resource))
        .catch(err => response.status(400).json('Error' + err));
    }))

    router.get('/:id', asyncHandler(async (request, response, next) => {
      console.log('id:', request.params.id);
      await this.model.findById(ObjectId(request.params.id)).exec()
        .then(resource =>  response.json(resource))
        .catch(err =>  next(err))
    }))

    router.post('/', asyncHandler(async (request, response, next) => {
      console.log('post');
      await this.model.create(request.body)
        .then(resource => response.json(resource))
        .catch(err => next(err))
    }))

    router.delete('/:id', asyncHandler(async (request, response, next) => {
      console.log('delete');
      await this.model.deleteOne({ _id: request.params.id })
        .then(console.log('Item deleted'))
        .catch(err => next(err))
    }))
  
    return router;
  }
}