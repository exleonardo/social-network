import { ProfileUserType, UsersContactType } from '@/API/profile-api'
import { Contact } from '@/components/Profile/Contact/Contact'
import { Button } from 'antd'

type ProfileDataType = {
  goToEditMode: () => void
  isOwner: boolean
  profile: ProfileUserType
}
export const ProfileData = ({ goToEditMode, isOwner, profile }: ProfileDataType) => {
  return (
    <div>
      {isOwner && (
        <div>
          <Button onClick={goToEditMode}>Edit</Button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job </b> {profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professionals skills </b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me </b>
        {profile.aboutMe}
      </div>
      <div>
        <b>
          Contacts:
          {Object.keys(profile.contacts).map(el => {
            return (
              <Contact
                contactTitle={el}
                contactValue={profile.contacts[el as keyof UsersContactType]}
                key={el}
              />
            )
          })}
        </b>
      </div>
    </div>
  )
}
