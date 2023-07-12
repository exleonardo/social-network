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
        <Post message={"Hi how are you"} likesCount={1} />
        <Post message={"It's my post "} likesCount={23}/>
      </div>
    </div>
  );
};

export default MyPosts;