import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileDataForm} from "./ProfileInfo/ProfileDataForm";
import {ProfileUserType} from "../../API/profile-api";


type ProfileTypeProps = {
  profile: null | ProfileUserType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileDataForm) => Promise<void>;
}
const Profile: React.FC<ProfileTypeProps> = ({
                                               profile ,
                                               status ,
                                               updateStatus ,
                                               isOwner ,
                                               savePhoto ,
                                               saveProfile
                                             }) => {
  return (
    <div>
      <ProfileInfo saveProfile={saveProfile} savePhoto={savePhoto} isOwner={isOwner}
                   profile={profile}
                   status={status}
                   updateStatus={updateStatus}/>
      <MyPostsContainer/>
    </div>
  );
};

export default Profile;