import { useLoggetInUser } from '@/features/Logget-in-user/hooks/useLoggetInUser'
import { Button } from '@/shared/Button/ui/Button'

import s from '@/widgets/Header/style/index.module.scss'

export const LoggetInUser = () => {
  const { isAuth, loggedOut } = useLoggetInUser()

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
