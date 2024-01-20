import { useAppSelector } from '@/app/store/redux-store'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'

export const usePhoto = () => {
  const photo = useAppSelector(getProfile)?.photos.large

  return { photo }
}
