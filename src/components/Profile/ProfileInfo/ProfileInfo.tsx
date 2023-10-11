import React , {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"
import {ProfileUserType} from "../../../API/socialNetworkAPI";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/yoda_star_wars_icon_131348.png";

type ProfileInfoType = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void
}
const ProfileInfo: React.FC<ProfileInfoType> = ({ profile , updateStatus , status , isOwner , savePhoto }) => {
    if ( !profile ) {
        return <Preloader/>
    }
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if ( e.target.files !== null ) {
            savePhoto ( e.target.files[0] )
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}><img src={profile.photos.large || userPhoto} alt=""/>
                {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
                <div>
                    <div>
                        <b>Full name</b>:{profile.fullName}
                    </div>
                    <div>
                        <b>Looking for a job {profile.lookingForAJob ? 'Yes' : 'No'}</b>
                    </div>
                    {profile.lookingForAJob &&
                        <div>
                            <b>My professionals skills{profile.lookingForAJobDescription}</b>
                        </div>}
                    <div>
                        <b>About me{profile.aboutMe}</b>
                    </div>

                </div>
                <ProfileStatusWithHooks
                    updateStatus={updateStatus}
                    status={status}/></div>
        </div>
    );
};

export default ProfileInfo;