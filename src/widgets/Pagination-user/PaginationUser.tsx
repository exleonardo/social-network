import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCurrentPage, getTotalUsersCount, getUsersFilter } from '@/components/users-selectors'
import { requestUsers } from '@/redux/users-reducer'
import { Pagination } from 'antd'

import s from './pagination-user.module.scss'

export const PaginationUser = () => {
  const filter = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()
  const totalUsersCount = useAppSelector(getTotalUsersCount)
  const currentPage = useAppSelector(getCurrentPage)
  const onPageChanged = (page: number, pageSize: number) => {
    dispatch(requestUsers(page, pageSize, filter))
  }

  return (
    <Pagination
      className={s.pagination}
      current={currentPage}
      defaultPageSize={5}
      onChange={onPageChanged}
      pageSizeOptions={[5, 10, 15, 20]}
      showQuickJumper
      total={totalUsersCount}
    />
  )
}
