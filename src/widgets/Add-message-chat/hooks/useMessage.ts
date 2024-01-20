import { useAppSelector } from '@/app/store/redux-store'
import { getStatus } from '@/pages/Chat/selectors/chat-selector'

export const useMessage = () => {
  const status = useAppSelector(getStatus)

  return { status }
}
