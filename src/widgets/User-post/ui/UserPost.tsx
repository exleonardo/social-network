import { useAppSelector } from '@/app/store/redux-store'
import { DeletePost } from '@/features/Delete-post/ui/DeletePost'
import { LikedPost } from '@/features/Liked-post/ui/LikedPost'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { Avatar, message } from 'antd'

import s from '../style/index.module.scss'

type PostType = {
  id: number
  isLiked: boolean
  likesCount: number
  message: string
}
export const UserPost = ({ id, isLiked, likesCount, ...props }: PostType) => {
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
