import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import MyPosts from "./MyPosts/MyPosts";


type ProfileTypeProps = {
  isOwner: boolean;
}
const Profile = ({ isOwner }: ProfileTypeProps) => {

  return (
    <div>
      <ProfileInfo isOwner={isOwner}/>
      <MyPosts/>
    </div>
  );
};

export default Profile;