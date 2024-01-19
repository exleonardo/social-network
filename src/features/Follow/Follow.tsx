import { useAppDispatch } from '@/app/redux-store'
import { unfollow } from '@/redux/users-reducer'
import { Button, Popconfirm } from 'antd'
type UserType = {
  userId: number
}
export const Follow = ({ userId }: UserType) => {
  const dispatch = useAppDispatch()
  const unfollowUser = () => {
    return dispatch(unfollow(userId))
  }

  return (
    <Popconfirm
      description={'Are you sure you want to subscribe?'}
      onConfirm={unfollowUser}
      title={'Get Exclusive Content Only for Subscribers!'}
    >
      {' '}
      <Button type={'primary'}>Follow</Button>
    </Popconfirm>
  )
}
