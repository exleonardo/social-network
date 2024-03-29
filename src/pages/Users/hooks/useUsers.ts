import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import {
  getCurrentPage,
  getPageSize,
  getUsers,
  getUsersFilter,
} from '@/pages/Users/selectors/users-selectors'
import { requestUsers } from '@/redux/users-reducer'

export const useUsers = () => {
  const isAuth = useAppSelector(getIsAuth)
  const users = useAppSelector(getUsers)
  const filter = useAppSelector(getUsersFilter)
  const pageSize = useAppSelector(getPageSize)
  const currentPage = useAppSelector(getCurrentPage)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const parsed = new URLSearchParams(location.search.substr(1))

    let actualPage = currentPage
    let actualFilter = filter

    if (parsed.get('page')) {
      actualPage = Number(parsed.get('page'))
    }
    if (parsed.get('term')) {
      const term = parsed.get('term') || ''

      actualFilter = { ...filter, term }
    }
    if (parsed.get('friend')) {
      const friend = parsed.get('friend') || ''

      actualFilter = { ...filter, friend }
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])
  useEffect(() => {
    const params = new URLSearchParams()

    params.append('term', filter.term)
    params.append('friend', filter.friend)
    params.append('page', String(currentPage))

    if (filter.term === '') {
      params.delete('term')
    }
    if (filter.friend === '') {
      params.delete('friend')
    }
    if (currentPage === 1) {
      params.delete('page')
    }

    history.push({
      pathname: '/users',
      search: `${params.toString()}`,
    })
  }, [filter, currentPage])

  return { isAuth, users }
}
