import { UserAvatar } from '@/features/User-avatar/UserAvatar'
import { UserTitle } from '@/features/User-title/UserTitle'

import s from './message-receive.module.scss'
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <UserTitle
              className={s.userTitleReceive}
              moveToProfile={() => {}}
              userName={userName}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <UserAvatar
                className={s.chatReceiveAvatar}
                moveToProfile={() => {}}
                userPhoto={photo}
              />
              <p className={s.receive}>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
