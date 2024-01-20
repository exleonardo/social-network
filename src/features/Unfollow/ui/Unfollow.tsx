import { useAppDispatch } from '@/app/store/redux-store'
import { follow } from '@/redux/users-reducer'
import { Button, Popconfirm } from 'antd'
type FollowType = {
  userId: number
}
export const Unfollow = ({ userId }: FollowType) => {
  const dispatch = useAppDispatch()
  const followUser = () => {
    return dispatch(follow(userId))
  }

  return (
    <Popconfirm
      description={'Are you sure you want to unsubscribe'}
      onConfirm={followUser}
      title={"We're sorry that you want to unsubscribe from our updates."}
    >
      {' '}
      <Button>Unfollow</Button>
    </Popconfirm>
  )
}
