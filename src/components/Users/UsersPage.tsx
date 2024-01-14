import { Redirect } from 'react-router-dom'

import { useAppSelector } from '@/redux/redux-store'

import { getIsAuth } from '../Login/auth-selectors'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'
import { getIsFetching } from './users-selectors'

export const UsersPage = () => {
  const isFetching = useAppSelector(getIsFetching)
  const isAuth = useAppSelector(getIsAuth)

  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <>
      {isFetching && <Preloader fullscreen={false} />}
      <Users />
    </>
  )
}
