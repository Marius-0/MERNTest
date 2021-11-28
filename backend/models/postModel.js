import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    media: [String],
    link: String,
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
      // {
      //   userID: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     required: true,
      //   },
      //   userName: {
      //     type: String,
      //     required: true,
      //   },
      //   body: {
      //     type: String,
      //     required: true,
      //   },
      //   likes: {
      //     type: [
      //       {
      //         userId: mongoose.Schema.Types.ObjectId,
      //         userName: String,
      //       },
      //       {
      //         timestamps: true,
      //       },
      //     ],
      //     defualt: [],
      //   },
      // },
      // {
      //   timestamps: true,
      // },
    ],
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
