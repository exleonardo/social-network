import { useHistory } from 'react-router-dom'

import { useAppDispatch } from '@/app/store/redux-store'
import { clearUserProfile } from '@/redux/profile-reducer'
import { toggleIsFetching } from '@/redux/users-reducer'

export const useStatusSubscribtion = (userId: number) => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const moveToProfile = () => {
    dispatch(toggleIsFetching(true))
    dispatch(clearUserProfile())
    history.push(`profile/${userId}`)
  }

  return { moveToProfile }
}
