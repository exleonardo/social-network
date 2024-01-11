import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { requestUsers } from '@/redux/users-reducer'
import { Pagination } from 'antd'

import s from './users.module.scss'

import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from './users-selectors'

const Users = () => {
  const users = useAppSelector(getUsers)
  const filter = useAppSelector(getUsersFilter)
  const totalUsersCount = useAppSelector(getTotalUsersCount)
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

  const onPageChanged = (page: number, pageSize: number) => {
    dispatch(requestUsers(page, pageSize, filter))
  }

  return (
    <div className={s.users}>
      <UsersSearchForm />

      <div className={s.user}>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </div>

      <Pagination
        className={s.pagination}
        current={currentPage}
        defaultPageSize={5}
        onChange={onPageChanged}
        pageSizeOptions={[5, 10, 15, 20]}
        showQuickJumper
        total={totalUsersCount}
      />
    </div>
  )
}

export default Users
