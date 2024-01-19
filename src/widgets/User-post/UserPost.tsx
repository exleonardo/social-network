import { useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { DeletePost } from '@/features/Delete-post/DeletePost'
import { LikedPost } from '@/features/Liked-post/LikedPost'
import { Avatar, message } from 'antd'

import s from './user-post.module.scss'

type PostType = {
  id: number
  isLiked: boolean
  likesCount: number
  message: string
}
const UserPost = ({ id, isLiked, likesCount, ...props }: PostType) => {
  const [, contextHolder] = message.useMessage()
  const profile = useAppSelector(getProfile)

  if (!profile) {
    return
  }

  return (
    <>
      <div className={s.item}>
        {contextHolder}
        <div>
          <Avatar size={'large'} src={profile.photos.small} />
        </div>
        <div className={s.userMessage}>
          <div className={s.userName}>{profile.fullName}</div>
          <div className={s.message}>{props.message}</div>
        </div>
        <div className={s.userData}>
          <LikedPost className={isLiked ? s.userLikeChecked : s.userLike} id={id} />
          <div className={s.likesCount}>{likesCount}</div>
          <DeletePost className={s.deletePost} id={id} />
        </div>
      </div>
    </>
  )
}

export default UserPost
