import express, { application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import baseRouter from "./routes/baseRoute.js";
import userRoute from "./routes/userRoute.js";
import accountRouter from "./routes/accountRouter.js";
import authorization from "./middleware/auth.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

const uri = process.env.DB_URI;
const con = await mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log(`Database connected : ${con.connection.host}`))
  .catch((err) => console.error(`Database failed to connect, error : ${err}`));

const app = express();

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import User from "./models/usersModel.js";
import Post from "./models/postModel.js";
import Comments from "./models/commentModel.js";
import Chat from "./models/postModel.js";

import PostRouter from "./routes/postRouter.js";
import CommentRouter from "./routes/commentRouter.js";

app.get("/test", (req, res) => {
  res.send("test check");
});

app.use("/account", accountRouter);

const chatRouter = new baseRouter(Chat).router;

app.use("/api/users", authorization, userRoute);
app.use("/api/chats", authorization, chatRouter);
app.use("/api/comments", authorization, CommentRouter);
app.use("/api/posts", authorization, PostRouter);

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

export default app;
