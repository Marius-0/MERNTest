import asyncHandler from 'express-async-handler'
import express from 'express'

export default class baseRouter {
  constructor(model) {
    this.model = model;
  }

  get router() {
    const router = express.Router();

    router.get('/', asyncHandler(async (request, response, next) => {
      console.log('get');
      await this.model.find().exec()
        .then(resource =>  response.json(resource))
        .catch(err => response.status(400).json('Error' + err));
      next();
    }))

    router.get('/:id', asyncHandler(async (request, response, next) => {
      console.log('getbyid');
      await this.model.findById(request.params.id).exec()
        .then(resource =>  response.json(resource))
        .catch(err =>  next(err))
      next();
    }))

    router.post('/', asyncHandler(async (request, response, next) => {
      console.log('post');
      await this.model.create(request.body)
        .then(resource => response.json(resource))
        .catch(err => next(err))
        next();
    }))

    router.delete('/:id', asyncHandler(async (request, response, next) => {
      console.log('delete');
      await this.model.deleteOne({ _id: request.params.id })
        .then(console.log('Item deleted'))
        .catch(err => next(err))
        next();
    }))
  
    return router;
  }
}