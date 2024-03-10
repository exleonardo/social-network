import { useRef } from 'react'

import { instance, setting } from '@/API/api'
import { useUploadPhoto } from '@/features/Upload/hook/useUploadPhoto'
import { Button } from '@/shared/Button'
import { Upload } from 'antd'
import { clsx } from 'clsx'

type UploadFotoType = {
  className?: string
}
export const UploadPhoto = ({ className }: UploadFotoType) => {
  const { authorizedUserId, props, userId } = useUploadPhoto()
  const classes = clsx(className)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    authorizedUserId === userId && (
      <Button className={classes} onClick={() => buttonRef?.current?.click()}>
        Upload Photo
        <Upload
          headers={setting.headers}
          showUploadList={false}
          style={{ display: 'block' }}
          withCredentials
          {...props}
          action={`${instance.defaults.baseURL}/profile/photo`}
        >
          <button hidden ref={buttonRef} />
        </Upload>
      </Button>
    )
  )
}
