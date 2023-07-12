import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
  return (
    <div className={s.content}>
      <div><img src="https://image.wallperz.com/big_thumbs/wallperz.com_big_thumbs_v8ic75mj4xvwjo7k2vsiq03g1rxiix.jpg" alt="ava"/></div>
      <div>ava + descr</div>
      <MyPosts/>
    </div>
  );
};

export default Profile;