import { useAppSelector } from '@/app/store/redux-store'
import { getMyPosts } from '@/pages/Profile/selectors/profile-selector'
import { UserPost } from '@/widgets/User-post/ui/UserPost'

import s from '../style/index.module.scss'

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
