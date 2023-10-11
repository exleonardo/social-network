import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../API/socialNetworkAPI";


type ProfileTypeProps = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void;
}
const Profile: React.FC<ProfileTypeProps> = ({ profile , status , updateStatus , isOwner , savePhoto }) => {
    return (
        <div>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status}
                         updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;