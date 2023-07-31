import React from "react";
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from '../../redux/state';


type ProfileTypeProps={
    state:ProfilePageType
    addPost:(postMessage:string)=>void
}
const Profile = (props:ProfileTypeProps) => {
  return (
    <div>
      <ProfileInfo/>
      <MyPosts posts={props.state.posts} addPost={props.addPost}/>
    </div>
  );
};

export default Profile;