import Post from "../models/postModel.js";
import baseRouter from "./baseRoute.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import asyncHandler from "express-async-handler";
import express from "express";
import Comment from "../models/commentModel.js";

//const router = new baseRouter(Post).router;

const router = express.Router();

router.get("/", async (request, response, next) => {
  let pos = request.query.pos ?? 0;
  let n = request.query.n ?? 2;

  await Post.find()
    .populate("user", "firstName secondName avatar")
    .populate({
      path: "comments",
      skip: pos,
      limit: n,
      options: { sort: { createdAt: "desc" } },
      populate: {
        path: "user",
        select: "firstName secondName avatar",
      },
    })
    .exec()
    .then((resource) => response.json(resource))
    .catch(next) //response.status(400).json("Error" + err))
    .then(console.log("url:", request.originalUrl));
});

router.get("/:id", async (request, response, next) => {
  let pos = request.query.pos ?? 0;
  let n = request.query.n ?? 2;

  await Post.find({ _id: request.params.id })
    .populate({
      path: "comments",
      skip: pos,
      limit: n,
      options: { sort: { createdAt: "desc" } },
      populate: {
        path: "user",
        select: "firstName secondName avatar",
      },
    })
    .exec()
    .then((resource) => response.json(resource))
    .catch((err) => next(err))
    .then(console.log("url:", request.originalUrl));
});

router.post(
  "/",
  asyncHandler(async (request, response, next) => {
    await Post.create(request.body)
      .then((resource) => response.json(resource))
      .catch((err) => next(err))
      .then(console.log("url:", request.originalUrl));
  })
);

router.delete(
  "/:id",
  asyncHandler(async (request, response, next) => {
    await Post.deleteOne({ _id: request.params.id })
      .then(console.log("Item deleted"))
      .catch((err) => next(err))
      .then(console.log("url:", request.originalUrl));
  })
);

router.patch("/:id/like", async (req, res, next) => {
  try {
    const resource = await Post.findByIdAndUpdate(
      ObjectId(req.params.id),
      req.body.like
        ? { $addToSet: { likes: req.body.userId } }
        : { $pull: { likes: req.body.userId } }
    );
    return res.json(resource);
  } catch (err) {
    return console.log(err);
  }
});

router.patch("/:id/comment", async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    const ressource = await Post.findByIdAndUpdate(ObjectId(req.params.id), {
      $addToSet: { comments: comment },
    });
    return res.json(ressource);
  } catch (err) {
    return console.log(err);
  }
});

export default router;
