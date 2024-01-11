import React from 'react'
import { Redirect } from 'react-router-dom'

import { useAppSelector } from '../../redux/redux-store'
import { getIsAuth } from '../Login/login-selectors'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'
import { getIsFetching } from './users-selectors'

export const UsersPage = () => {
  const isFetching = useAppSelector(getIsFetching)
  const initialized = useAppSelector(getIsAuth)

  if (!initialized) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}
