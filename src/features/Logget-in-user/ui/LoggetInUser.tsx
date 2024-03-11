import { Link } from 'react-router-dom'

import { useLoggetInUser } from '@/features/Logget-in-user/hooks/useLoggetInUser'
import { Button } from '@/shared/Button/ui/Button'

import s from '@/widgets/Header/style/index.module.scss'

export const LoggetInUser = () => {
  const { isAuth, loggedOut } = useLoggetInUser()

  return (
    <div className={s.loginBlock}>
      {isAuth && (
        <div>
          <Button className={s.logOut} onClick={loggedOut}>
            Log out
          </Button>
        </div>
      )}
      {!isAuth && (
        <Button as={Link} className={s.logOut} style={{ color: 'white' }} to={'/login'}>
          Login
        </Button>
      )}
    </div>
  )
}
