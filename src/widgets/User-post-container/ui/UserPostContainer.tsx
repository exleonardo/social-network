import { useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId } from '@/pages/Login/selectors/auth-selectors'
import { getUsersId } from '@/pages/Users/selectors/users-selectors'
import { UserPostForm } from '@/widgets/User-post-form'
import { UserPostsList } from '@/widgets/User-posts-list'

import s from '../style/index.module.scss'

export const UserPostContainer = () => {
  const userId = useAppSelector(getUsersId)
  const currentUserId = useAppSelector(getCurrentUserId)

  return (
    <>
      {userId === currentUserId && (
        <div className={s.postsBlock}>
          <h3 className={s.post}>My Posts</h3>
          <UserPostForm />
          <UserPostsList />
        </div>
      )}
    </>
  )
}
