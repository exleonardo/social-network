import { memo } from 'react'

import { useStatus } from '@/widgets/Status/hooks/useStatus'
import { Input, Modal } from 'antd'

import s from '../style/index.module.scss'

type StatusType = {
  className?: string
}
export const Status = memo(({ className }: StatusType) => {
  const {
    activateEditMode,
    cancel,
    contextHolder,
    currentUserId,
    onStatusChange,
    state,
    status,
    statusProfile,
    userId,
  } = useStatus()

  return (
    <div className={className ? className : s.status} onClick={cancel}>
      {contextHolder}
      {
        <div className={s.statusText}>
          <span>{statusProfile ? statusProfile : 'No status'}</span>
        </div>
      }
      {userId === currentUserId && (
        <Modal centered okText={'Save'} onCancel={cancel} onOk={activateEditMode} open={state}>
          <Input
            autoFocus
            maxLength={100}
            onChange={onStatusChange}
            onClick={e => e.stopPropagation()}
            showCount
            value={status}
          />
        </Modal>
      )}
    </div>
  )
})
