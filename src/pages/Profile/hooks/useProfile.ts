import { useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId, getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { getIsFetching } from '@/pages/Users/selectors/users-selectors'

export const useProfile = () => {
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const isAuth = useAppSelector(getIsAuth)
  const isFetching = useAppSelector(getIsFetching)
  const profile = useAppSelector(getProfile)

  return { authorizedUserId, isAuth, isFetching, profile }
}
