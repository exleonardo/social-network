import MyPosts from './MyPosts/MyPosts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

type ProfileTypeProps = {
  isOwner: boolean
}
const Profile = ({ isOwner }: ProfileTypeProps) => {
  return (
    <div>
      <ProfileInfo isOwner={isOwner} />
      {isOwner && <MyPosts />}
    </div>
  )
}

export default Profile
