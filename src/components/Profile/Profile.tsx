import React from "react";
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsType} from '../../index';

type ProfileTypeProps={
    posts:PostsType[]
}
const Profile = (props:ProfileTypeProps) => {

  return (
    <div>
      <ProfileInfo/>
      <MyPosts posts={props.posts}/>
    </div>
  );
};

export default Profile;