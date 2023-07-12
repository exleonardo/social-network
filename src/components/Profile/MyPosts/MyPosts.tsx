import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";


const MyPosts = () => {
  return (
    <div>My Posts
      <div>
        <textarea ></textarea>
        <button>add post</button></div>
      <div className={s.posts}>
        <Post/>
        <Post/>
      </div>
    </div>
  );
};

export default MyPosts;