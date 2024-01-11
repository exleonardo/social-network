import { deletePostActionCreator } from '@/redux/profile-reducer'
import { useAppDispatch } from '@/redux/redux-store'
import { DeleteOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Popconfirm, message } from 'antd'

import s from './post.module.scss'

type PostType = {
  id: number
  likesCount: string
  message: string
}
const Post = (props: PostType) => {
  const dispatch = useAppDispatch()
  const [, contextHolder] = message.useMessage()

  const cancel = () => {
    message.info('the post has not been deleted')
  }

  const deleteMessage = () => {
    message.success('post deleted', 2)
    dispatch(deletePostActionCreator(props.id))
  }

  return (
    <div className={s.item}>
      {contextHolder}
      <img
        alt={'avatarLogo'}
        src={'https://cdn.icon-icons.com/icons2/1070/PNG/72/stormtrooper_icon-icons.com_76962.png'}
      />
      {props.message}
      <Popconfirm
        cancelText={'No'}
        description={'Are you sure to delete this post?'}
        okText={'Yes'}
        onCancel={cancel}
        onConfirm={deleteMessage}
        title={'Delete the post'}
      >
        <Button icon={<DeleteOutlined rev={undefined} />} size={'small'} />
      </Popconfirm>
      <div>
        <Button
          icon={<HeartFilled rev={undefined} />}
          style={{ background: 'none', border: 'none' }}
        >
          {props.likesCount}
        </Button>
      </div>
    </div>
  )
}

//<HeartFilled /> <HeartOutlined rev={undefined}/>
export default Post
