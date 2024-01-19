import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getUsersFilter } from '@/components/users-selectors'
import { setFilter } from '@/redux/users-reducer'
import { Select } from 'antd'

import s from '@/pages/Users/users.module.scss'

type UserSubscription = {
  isSubmitting: boolean
  onSearch?: () => void
}
export const UserSubscriptionSelect = ({ isSubmitting, onSearch, ...props }: UserSubscription) => {
  const filter = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()
  const selectData = [
    { label: 'All', value: '' },
    { label: 'Only followed', value: 'false' },
    { label: 'Only unfollowed', value: 'true' },
  ]
  const setFilterUser = (value: string) => {
    const filterValue = { friend: value, term: filter.term }

    dispatch(setFilter(filterValue))
  }

  return (
    <Select
      onSelect={onSearch}
      {...props}
      className={s.select}
      disabled={isSubmitting}
      labelInValue={false}
      onChange={setFilterUser}
      options={selectData}
      size={'large'}
      style={{ width: 200 }}
      value={filter.friend}
    />
  )
}
