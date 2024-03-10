import { useAppDispatch } from '@/app/store/redux-store'
import { useUserSubscriber } from '@/features/User-subscription-select/hooks/useUserSubscriber'
import { setFilter } from '@/redux/users-reducer'
import { Select } from 'antd'

import s from '@/pages/Users/style/index.module.scss'

type UserSubscription = {
  isSubmitting: boolean
  onSearch?: () => void
}
export const UserSubscriptionSelect = ({ isSubmitting, onSearch, ...props }: UserSubscription) => {
  const { filter, selectData } = useUserSubscriber()
  const dispatch = useAppDispatch()

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
      value={filter.friend}
    />
  )
}
