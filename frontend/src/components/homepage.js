import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PostList from "./post.js";
import MakePost from "./create_post.js";
import PostDialog from "./post_dialog.js";
import PrimarySearchAppBar from "./appbar.js";
import axios from "axios";
import Post from "../post/post";

const useStyles = makeStyles((theme = undefined) => ({
  main: {
    width: "fit-content",
    width: "-moz-fit-content",
    margin: "auto",
  },
}));

export default function Homepage({ auth }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loaded, setLoaded] = React.useState(false);

  const [posts, setPosts] = useState([]);
  const removePost = (id) => {
    console.log("bfre", posts);
    setPosts(posts.filter((x) => id !== x._id));
    console.log("afrt", posts);
  };

  const getPosts = () =>
    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getPosts();
  }, []);

  const handlePost = (data) => {
    axios
      .post("http://localhost:3000/api/posts", data, { withCredentials: true })
      .then((res) => setPosts([res.data, ...posts]))
      .catch((err) => console.log(err));
    /*
    post("http://localhost:3000/api/posts", data).then((response) => {
      setPosts([response, ...posts]);
    });
    */
  };

  return (
    <>
      <PrimarySearchAppBar />
      <div className={classes.main}>
        <MakePost onOpen={handleOpen} />
        <PostDialog open={open} onClose={handleClose} onPost={handlePost} />
        <Post posts={posts} />
      </div>
    </>
  );
}

// <PostList posts={posts} removePost={removePost} />
