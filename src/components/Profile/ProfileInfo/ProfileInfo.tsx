import React , {ChangeEvent , useState} from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/yoda_star_wars_icon_131348.png";
import ProfileDataFormReduxForm , {ProfileDataForm} from "./ProfileDataForm";
import {ProfileUserType , UsersContactType} from "../../../API/profile-api";
import {useAppDispatch , useAppSelector} from "../../../redux/redux-store";
import {getProfile} from "../profile-selector";
import {Contact} from "../Contact/Contact";
import {savePhoto , saveProfile} from "../../../redux/profile-reducer";
import {Button , message} from "antd";

type ProfileInfoType = {
  isOwner: boolean;
}
const ProfileInfo: React.FC<ProfileInfoType> = ({ isOwner }: ProfileInfoType) => {
  const [editMode , setEditMode] = useState ( false )
  const profile = useAppSelector ( getProfile )

  const dispatch = useAppDispatch ()
  if ( !profile ) {
    return <Preloader/>
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files !== null ) {
      dispatch ( savePhoto ( e.target.files[0] ) )
    }
  }
  const onSubmit = (formData: ProfileDataForm) => {
    dispatch ( saveProfile ( formData ) ).then ( () => setEditMode ( false ) ).catch ( error => {
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
                                    onSubmit={onSubmit}/> :
          <ProfileData isOwner={isOwner} profile={profile} goToEditMode={() => {
            setEditMode ( !editMode )
          }}/>}

        <ProfileStatusWithHooks/>
      </div>
    </div>
  );
};


export default ProfileInfo;


type ProfileData = {
  profile: ProfileUserType;
  isOwner: boolean;
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileData> = ({ profile , isOwner , goToEditMode }) => {
  return <div>
    {isOwner && <div>
        <Button onClick={goToEditMode}>Edit</Button>
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
