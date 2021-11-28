import asyncHandler from "express-async-handler";
import express from "express";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export default class baseRouter {
  constructor(model) {
    this.model = model;
  }

  get router() {
    const router = express.Router();

    router.get("/", async (request, response, next) => {
      await this.model
        .find()
        .exec()
        .then((resource) => response.json(resource))
        .catch((err) => next(err)) //response.status(400).json("Error" + err))
        .then(console.log("url:", request.originalUrl));
    });

    router.get(
      "/:id",
      asyncHandler(async (request, response, next) => {
        await this.model
          .findById(ObjectId(request.params.id))
          .exec()
          .then((resource) => response.json(resource))
          .catch((err) => next(err))
          .then(console.log("url:", request.originalUrl));
      })
    );

    router.post(
      "/",
      asyncHandler(async (request, response, next) => {
        await this.model
          .create(request.body)
          .then((resource) => response.json(resource))
          .catch((err) => next(err))
          .then(console.log("url:", request.originalUrl));
      })
    );

    router.delete(
      "/:id",
      asyncHandler(async (request, response, next) => {
        await this.model
          .deleteOne({ _id: request.params.id })
          .then(console.log("Item deleted"))
          .catch((err) => next(err))
          .then(console.log("url:", request.originalUrl));
      })
    );

    return router;
  }
}

export function baseroute(model) {
  return new baseRouter(model).router;
}
