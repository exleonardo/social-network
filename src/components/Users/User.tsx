import { NavLink, useHistory } from 'react-router-dom'

import { UsersInfoType } from '@/API/profile-api'
import { useAppDispatch } from '@/redux/redux-store'
import { follow, unfollow } from '@/redux/users-reducer'
import { Button, Popconfirm } from 'antd'

import userPhoto from '../../assets/images/yoda_star_wars_icon_131348.png'

type UserTypeProps = {
  user: UsersInfoType
}
export const User = ({ user }: UserTypeProps) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const moveToProfile = () => {
    history.push(`profile/${user.id}`)
  }
  const unfollowUser = () => {
    return dispatch(unfollow(user.id))
  }
  const followUser = () => {
    return dispatch(follow(user.id))
  }

  return (
    <div>
      <span>
        <div>
          <NavLink onClick={moveToProfile} to={{}}>
            <img alt={'avatar'} src={user.photos.small ? user.photos.small : userPhoto} />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <Popconfirm
              description={'Are you sure you want to subscribe?'}
              onConfirm={unfollowUser}
              title={'Get Exclusive Content Only for Subscribers!'}
            >
              {' '}
              <Button type={'primary'}>Follow</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              description={'Are you sure you want to unsubscribe'}
              onConfirm={followUser}
              title={"We're sorry that you want to unsubscribe from our updates."}
            >
              {' '}
              <Button>Unfollow</Button>
            </Popconfirm>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  )
}
