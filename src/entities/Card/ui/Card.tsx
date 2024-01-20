import { UsersContactType } from '@/API/profile-api'
import { useAppSelector } from '@/app/store/redux-store'
import { Contact } from '@/features/Contact/ui/Contact'
import { EditProfileButton } from '@/features/Edit-profile-button/ui/EditProfileButton'
import { UploadPhoto } from '@/features/Upload/ui/UploadPhoto'
import { UserPhoto } from '@/features/User-Photo/ui/UserPhoto'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { ProfileEditor } from '@/widgets/Profile-editor/ui/ProfileEditor'
import { Status } from '@/widgets/Status/ui/Status'

import s from '../style/index.module.scss'

export const Card = () => {
  const profile = useAppSelector(getProfile)

  if (!profile) {
    return
  }

  return (
    <div className={s.card}>
      <span className={s.fullName}>{profile?.fullName}</span>
      <div className={s.statusBlock}>
        <div className={s.img}>
          <UserPhoto />
        </div>
        <div>
          <Status className={s.status} />
        </div>
      </div>
      <div className={s.info}>
        <p>About Me: {profile?.aboutMe}</p>
        <p>My Skills: {profile?.lookingForAJobDescription}</p>
        <p>Looking for a job: {profile?.lookingForAJob ? 'Yes' : 'No'}</p>
      </div>

      <div className={s.share}>
        {Object.keys(profile.contacts).map(el => {
          return (
            <Contact
              contactTitle={el}
              contactValue={profile.contacts[el as keyof UsersContactType]}
              key={el}
            />
          )
        })}
      </div>
      <div className={s.updateProfile}>
        <EditProfileButton className={s.editProfileButton} />
        <UploadPhoto />
        <ProfileEditor />
      </div>
    </div>
  )
}
