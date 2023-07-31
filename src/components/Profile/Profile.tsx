import React from "react";
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsType} from '../../redux/state';

type ProfileTypeProps={
    state:{
        posts:PostsType[];
    }
}
const Profile = (props:ProfileTypeProps) => {
  return (
    <div>
      <ProfileInfo/>
      <MyPosts posts={props.state.posts}/>
    </div>
  );
};

export default Profile;