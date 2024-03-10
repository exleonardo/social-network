import { usePagination } from '@/widgets/Pagination-user/hooks/usePagination'
import { Pagination } from 'antd'

import s from '../style/index.module.scss'

export const PaginationUser = () => {
  const { currentPage, onPageChanged, totalUsersCount } = usePagination()

  return (
    <Pagination
      className={s.pagination}
      current={currentPage}
      defaultPageSize={5}
      onChange={onPageChanged}
      pageSizeOptions={[5, 10, 15, 20]}
      size={'small'}
      total={totalUsersCount}
    />
  )
}
