import React , {ChangeEvent , useState} from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/yoda_star_wars_icon_131348.png";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileDataFormReduxForm , {ProfileDataForm} from "./ProfileDataForm";
import {ProfileUserType , UsersContactType} from "../../../API/profile-api";

type ProfileInfoType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileDataForm) => Promise<void>

}
const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                  profile ,
                                                  updateStatus ,
                                                  status ,
                                                  isOwner ,
                                                  savePhoto ,
                                                  saveProfile
                                                }) => {
  const [editMode , setEditMode] = useState ( false )
  if ( !profile ) {
    return <Preloader/>
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files !== null ) {
      savePhoto ( e.target.files[0] )
    }
  }
  const onSubmit = (formData: ProfileDataForm) => {
    saveProfile ( formData ).then ( () => setEditMode ( false ) ).catch ( error => {
      console.log ( error )
    } )
  }

  return (
    <div>
      <div className={s.descriptionBlock}><img src={profile.photos.large || userPhoto} alt=""/>
        {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
        {editMode ?
          <ProfileDataFormReduxForm editMode={editMode} initialValues={profile}
                                    goToEditMode={() => setEditMode ( !editMode )}
                                    saveProfile={saveProfile} onSubmit={onSubmit}/> :
          <ProfileData isOwner={isOwner} profile={profile} goToEditMode={() => {
            setEditMode ( !editMode )
          }}/>}

        <ProfileStatusWithHooks
          updateStatus={updateStatus}
          status={status}/></div>
    </div>
  );
};


export default ProfileInfo;
export const Contact: React.FC<ContactType> = ({ contactTitle , contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
type ContactType = {
  contactTitle: string;
  contactValue: string | null
}

type ProfileData = {
  profile: ProfileUserType;
  isOwner: boolean;
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileData> = ({ profile , isOwner , goToEditMode }) => {
  return <div>
    {isOwner && <div>
        <button onClick={goToEditMode}>Edit</button>
    </div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a job </b> {profile.lookingForAJob ? 'Yes' : 'No'}
    </div>
    {profile.lookingForAJob &&
        <div>
            <b>My professionals skills </b>{profile.lookingForAJobDescription}
        </div>}
    <div>
      <b>About me </b>{profile.aboutMe}
    </div>
    <div>
      <b>Contacts:{Object.keys ( profile.contacts ).map ( el => {
          return <Contact
            key={el} contactTitle={el}
            contactValue={profile.contacts[el as keyof UsersContactType]}/>
        }
      )}</b>
    </div>
  </div>
}
