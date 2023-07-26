import React from "react";
import s from "./Post.module.css"

type PostType ={
  message:string;
  likesCount:string
  id:string
}
const Post:React.FC<PostType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://w7.pngwing.com/pngs/29/684/png-transparent-stormtrooper-boba-fett-star-wars-original-trilogy-helmet-stormtrooper-star-wars-episode-vii-sports-equipment-motorcycle-helmet.png" alt="avatarLogo"/>
      { props.message }
      <div><span>like</span> {props.likesCount}</div>
    </div>
  );
};

export default Post;