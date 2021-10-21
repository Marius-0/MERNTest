import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    /*userName: {
      type: String,
      required: true,
    },*/
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    /*likes: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          userName: String,
        },
      ],
      defualt: [],
    },*/
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
