import { Redirect } from 'react-router-dom'

import { useAppSelector } from '@/app/redux-store'

import { getIsAuth } from '../Login/auth-selectors'
import Users from './Users'

export const UsersPage = () => {
  const isAuth = useAppSelector(getIsAuth)

  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <>
      <Users />
    </>
  )
}
