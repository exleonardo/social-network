import { memo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { UsersInfoType } from '@/API/profile-api'
import { useAppDispatch } from '@/redux/redux-store'
import { follow, toggleIsFetching, unfollow } from '@/redux/users-reducer'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, List, Popconfirm } from 'antd'

import s from './user.module.scss'

type UserTypeProps = {
  user: UsersInfoType
}
export const User = memo(({ user }: UserTypeProps) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const moveToProfile = () => {
    dispatch(toggleIsFetching(true))
    history.push(`profile/${user.id}`)
  }
  const unfollowUser = () => {
    return dispatch(unfollow(user.id))
  }
  const followUser = () => {
    return dispatch(follow(user.id))
  }
  const data = [
    {
      title: user.id,
    },
  ]

  return (
    <div className={s.user}>
      <List
        dataSource={data}
        itemLayout={'horizontal'}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <NavLink onClick={moveToProfile} to={{}}>
                  <Avatar icon={<UserOutlined />} src={`${user.photos.small}`} />
                </NavLink>
              }
              description={user.status}
              title={
                <NavLink onClick={moveToProfile} to={{}}>
                  {user.name}
                </NavLink>
              }
            />
            <br />
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
          </List.Item>
        )}
      />
    </div>
  )
})
