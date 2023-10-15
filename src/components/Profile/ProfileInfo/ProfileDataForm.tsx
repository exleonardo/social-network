import React from "react";
import {ProfileUserType , UsersContactType} from "../../../API/socialNetworkAPI";
import {createField , Input , Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps , reduxForm} from "redux-form";
import s from './../../common/FormsControls/FormsControls.module.css'

export type ProfilePropsFormType = {
    initialValues: ProfileUserType;
    editMode: boolean;
    goToEditMode: () => void;
    saveProfile: (profile: ProfileDataForm) => void;
}
export type ProfileDataForm = {
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }

}
type ProfileFormValuesTypeKeys = keyof ProfileDataForm | keyof UsersContactType

const ProfileDataForm: React.FC<ProfilePropsFormType & InjectedFormProps<ProfileUserType , ProfilePropsFormType>> = ({ handleSubmit , initialValues , error , editMode }) => {
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <button>Save</button>
            </div>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <b>Full
                    name</b>:{createField<ProfileFormValuesTypeKeys> ( 'Full name' , 'fullName' , [] , Input , { type: 'text' } )}
            </div>
            <div>
                <b>Looking for a
                    job </b>: {createField<ProfileFormValuesTypeKeys> ( '' , 'lookingForAJob' , [] , Input , { type: 'checkbox' } )}

            </div>

            <div>
                <b>My professionals
                    skills</b>: {createField<ProfileFormValuesTypeKeys> ( 'My professionals skills' , 'lookingForAJobDescription' , [] , Textarea , { type: 'text' } )}

            </div>
            <div>
                <b>About
                    me</b>: {createField<ProfileFormValuesTypeKeys> ( 'About me' , 'aboutMe' , [] , Textarea , { type: 'text' } )}

            </div>
            <div>
                <b>Contacts:{Object.keys ( initialValues.contacts ).map ( el => {
                        return <div className={"s.contact"} key={el}>
                            {el} : {createField ( el , 'contacts.' + el , [] , Input , { type: 'text' } )}
                        </div>
                    }
                )}</b>
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm = reduxForm<ProfileUserType , ProfilePropsFormType> ( { form: 'edit-profile' } ) ( ProfileDataForm )

export default ProfileDataFormReduxForm