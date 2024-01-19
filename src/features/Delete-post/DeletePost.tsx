import { memo } from 'react'

import { useAppDispatch } from '@/app/redux-store'
import { deletePostActionCreator } from '@/redux/profile-reducer'
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'

type DeletePostType = {
  className?: string
  id: number
}
export const DeletePost = memo(({ className, id }: DeletePostType) => {
  const dispatch = useAppDispatch()
  const cancel = () => {
    message.info('the post has not been deleted')
  }

  const deleteMessage = () => {
    message.success('post deleted', 2)
    dispatch(deletePostActionCreator(id))
  }

  return (
    <Popconfirm
      cancelText={'No'}
      description={'Are you sure to delete this post?'}
      okText={'Yes'}
      onCancel={cancel}
      onConfirm={deleteMessage}
      title={'Delete the post'}
    >
      <DeleteOutlined className={className} rev={undefined} />
    </Popconfirm>
  )
})
