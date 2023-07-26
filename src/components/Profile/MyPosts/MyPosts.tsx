import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";


type postsDataType = {
  id: string;
  message: string;
  likesCount: string
}
const MyPosts = () => {
  const postsData: postsDataType[] = [
    {id: "1", message: "Hi how are you", likesCount: "1"},
    {id: "2", message: "It's my post ", likesCount: "23"}
  ]
  const postsElements = postsData.map((el) => <Post id={ el.id } message={ el.message } likesCount={ el.likesCount }/>)

  return (
    <div className={ s.postsBlock }><h3>My Posts</h3>
      <div>
        <div><textarea></textarea></div>
        <div>
          <button>add post</button>
        </div>
      </div>
      <div className={ s.posts }>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;