import { Redirect } from 'react-router-dom'

import { useUsers } from '@/pages/Users/hooks/useUsers'
import { PaginationUser } from '@/widgets/Pagination-user'
import { User } from '@/widgets/User/ui/User'
import { UsersSearchForm } from '@/widgets/Users-search-form/ui/UsersSearchForm'

import s from '../style/index.module.scss'

export const Users = () => {
  const { isAuth, users } = useUsers()

  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <div className={s.users}>
      <UsersSearchForm />
      <div className={s.usersBlock}>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </div>
      <PaginationUser />
    </div>
  )
}
