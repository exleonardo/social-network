import { useAppSelector } from '@/app/store/redux-store'
import { getCollapsed } from '@/pages/Profile/selectors/profile-selector'

export const useToggle = () => {
  const collapsed = useAppSelector(getCollapsed)

  return { collapsed }
}
