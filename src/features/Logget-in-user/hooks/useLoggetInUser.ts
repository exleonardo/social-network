import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { logOut } from '@/redux/auth-reducer'

export const useLoggetInUser = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)

  const loggedOut = () => {
    dispatch(logOut())
  }

  return { isAuth, loggedOut }
}
