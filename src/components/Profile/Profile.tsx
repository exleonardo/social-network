import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";


type ProfileTypeProps = {
  isOwner: boolean;
}
const Profile = ({ isOwner }: ProfileTypeProps) => {

  return (
    <div>
      <ProfileInfo isOwner={isOwner}/>
      <MyPostsContainer/>
    </div>
  );
};

export default Profile;