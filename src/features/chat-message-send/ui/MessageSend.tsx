import { UserAvatar } from '@/features/User-avatar/ui/UserAvatar'
import { UserTitle } from '@/features/User-title/ui/UserTitle'

import s from '../style/index.module.scss'

type MessageSendType = {
  fullName: string
  message: string
  photo: string
  userName: string
}
export const MessageSend = ({ fullName, message, photo, userName }: MessageSendType) => {
  return (
    <>
      {userName === fullName && (
        <div className={s.sendBlock}>
          <div className={s.user}>
            <UserTitle className={s.userTitleSend} moveToProfile={() => {}} userName={userName} />
            <div className={s.blockMessage}>
              <p className={s.send + ' ' + s.p}>{message}</p>
              <UserAvatar className={s.chatSendAvatar} moveToProfile={() => {}} userPhoto={photo} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
