import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../API/socialNetworkAPI";
import {ProfileDataForm} from "./ProfileInfo/ProfileDataForm";


type ProfileTypeProps = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileDataForm) => Promise<void>;
}
const Profile: React.FC<ProfileTypeProps> = ({ profile , status , updateStatus , isOwner , savePhoto , saveProfile }) => {
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