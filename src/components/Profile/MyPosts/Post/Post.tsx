import React from "react";
import s from "./Post.module.css"


const Post = () => {
  return (
    <div className={s.item}>
      <img src="https://w7.pngwing.com/pngs/29/684/png-transparent-stormtrooper-boba-fett-star-wars-original-trilogy-helmet-stormtrooper-star-wars-episode-vii-sports-equipment-motorcycle-helmet.png" alt="avatarLogo"/>
      Post1
      <div><span>like</span></div>
    </div>
  );
};

export default Post;