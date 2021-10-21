import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import baseRouter from "./baseRoute.js";
import asyncHandler from "express-async-handler";
import express from "express";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const router = express.Router();

router.get("/", async (request, response, next) => {
  await Comment.find()
    .exec()
    .then((resource) => response.json(resource))
    .catch((err) => next(err)) //response.status(400).json("Error" + err))
    .then(console.log("url:", request.originalUrl));
});

router.get(
  "/:id",
  asyncHandler(async (request, response, next) => {
    await Comment.findById(ObjectId(request.params.id))
      .exec()
      .then((resource) => response.json(resource))
      .catch((err) => next(err))
      .then(console.log("url:", request.originalUrl));
  })
);

router.delete(
  "/:id",
  asyncHandler(async (request, response, next) => {
    await Comment.deleteOne({ _id: request.params.id })
      .then(console.log("Item deleted"))
      .catch((err) => next(err))
      .then(console.log("url:", request.originalUrl));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const resource = await Comment.create(req.body);
      const result = await Post.findByIdAndUpdate(ObjectId(req.body.postID), {
        $addToSet: { comments: resource._id },
      });
      return res.json(resource);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
);

export default router;
