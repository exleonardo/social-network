import { useHistory } from 'react-router-dom'

import { useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'

export const useNavbar = () => {
  const history = useHistory()
  const isAuth = useAppSelector(getIsAuth)

  return { history, isAuth }
}
