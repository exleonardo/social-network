import { useAppSelector } from '@/app/store/redux-store'
import { getUsersFilter } from '@/pages/Users/selectors/users-selectors'

export const useUserSubscriber = () => {
  const filter = useAppSelector(getUsersFilter)
  const selectData = [
    { label: 'All', value: '' },
    { label: 'Only followed', value: 'false' },
    { label: 'Only unfollowed', value: 'true' },
  ]

  return { filter, selectData }
}
