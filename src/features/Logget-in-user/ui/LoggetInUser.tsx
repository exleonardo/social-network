import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { logOut } from '@/redux/auth-reducer'
import { Button } from '@/shared/Button/ui/Button'

import s from '@/widgets/Header/style/index.module.scss'

export const LoggetInUser = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)

  const loggedOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={s.loginBlock}>
      {isAuth ? (
        <div>
          <Button className={s.logOut} onClick={loggedOut}>
            Log out
          </Button>
        </div>
      ) : (
        <Button as={'a'} className={s.logOut} href={'/login'} style={{ color: 'white' }}>
          Login
        </Button>
      )}
    </div>
  )
}
