import { useAppSelector } from '@/app/store/redux-store'
import { getStatus } from '@/pages/Chat/selectors/chat-selector'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'

export const useChat = () => {
  const status = useAppSelector(getStatus)
  const isAuth = useAppSelector(getIsAuth)

  return { isAuth, status }
}
