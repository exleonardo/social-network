import { UserAvatar } from '@/features/User-avatar/ui/UserAvatar'
import { UserTitle } from '@/features/User-title/ui/UserTitle'

import s from '../style/index.module.scss'
type MessageReceiveType = {
  fullName: string
  message: string
  photo: string
  userName: string
}
export const MessageReceive = ({ fullName, message, photo, userName }: MessageReceiveType) => {
  return (
    <>
      {userName !== fullName && (
        <div className={s.receiveBlock}>
          <div className={s.user}>
            <UserTitle
              className={s.userTitleReceive}
              moveToProfile={() => {}}
              userName={userName}
            />
            <div className={s.blockMessage}>
              <UserAvatar
                className={s.chatReceiveAvatar}
                moveToProfile={() => {}}
                userPhoto={photo}
              />
              <p className={s.receive + ' ' + s.p}>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
