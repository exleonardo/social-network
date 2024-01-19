import { UsersContactType } from '@/API/profile-api'
import { useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { Contact } from '@/features/Contact/Contact'
import { EditProfileButton } from '@/features/Edit-profile-button/EditProfileButton'
import { UploadFoto } from '@/features/Upload-foto/UploadFoto'
import UserPhoto from '@/features/User-Photo/UserPhoto'
import { ProfileEditor } from '@/widgets/Profile-editor/ProfileEditor'
import Status from '@/widgets/Status/Status'

import s from './card.module.scss'
const Card = () => {
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
        <UploadFoto />
        <ProfileEditor />
      </div>
    </div>
  )
}

export default Card
