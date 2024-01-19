import { memo } from 'react'

import { useAppDispatch } from '@/app/store/redux-store'
import { toggleLike } from '@/redux/profile-reducer'
import { HeartFilled } from '@ant-design/icons'

type LikedPostType = {
  className?: string
  id: number
}
export const LikedPost = memo(({ className, id }: LikedPostType) => {
  const dispatch = useAppDispatch()
  const postLiked = () => {
    dispatch(toggleLike(id))
  }

  return <HeartFilled className={className} onClick={postLiked} rev={undefined} />
})
