import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import {
  getCurrentPage,
  getTotalUsersCount,
  getUsersFilter,
} from '@/pages/Users/selectors/users-selectors'
import { requestUsers } from '@/redux/users-reducer'

export const usePagination = () => {
  const filter = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()
  const totalUsersCount = useAppSelector(getTotalUsersCount)
  const currentPage = useAppSelector(getCurrentPage)
  const onPageChanged = (page: number, pageSize: number) => {
    dispatch(requestUsers(page, pageSize, filter))
  }

  return { currentPage, onPageChanged, totalUsersCount }
}
