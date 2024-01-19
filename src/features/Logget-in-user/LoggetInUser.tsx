import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getIsAuth } from '@/components/auth-selectors'
import { logOut } from '@/redux/auth-reducer'
import { Button } from '@/shared/Button/Button'

import s from '@/widgets/Header/header.module.scss'

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
