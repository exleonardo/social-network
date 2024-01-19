import { useAppSelector } from '@/app/redux-store'
import { getCurrentUserId } from '@/components/auth-selectors'
import { getUsersId } from '@/components/users-selectors'
import { UserPostForm } from '@/widgets/User-post-form/UserPostForm'
import { UserPostsList } from '@/widgets/User-posts-list/UserPostsList'

import s from './user-post-container.module.scss'

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
