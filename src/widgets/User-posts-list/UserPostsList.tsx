import { useAppSelector } from '@/app/redux-store'
import { getMyPosts } from '@/components/profile-selector'
import UserPost from '@/widgets/User-post/UserPost'

import s from './user-posts-list.module.scss'

export const UserPostsList = () => {
  const posts = useAppSelector(getMyPosts)

  return (
    <div className={s.posts}>
      {posts.map(el => (
        <UserPost
          id={el.id}
          isLiked={el.isLiked}
          key={el.id}
          likesCount={el.likesCount}
          message={el.message}
        />
      ))}
    </div>
  )
}
