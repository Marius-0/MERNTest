import mongoose from "mongoose";
import Message from "./messageModel.js";

const ChatSchema = mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    messages: [mongoose.Schema.Types.ObjectId],
    name: {
      type: String,
      default: undefined,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
