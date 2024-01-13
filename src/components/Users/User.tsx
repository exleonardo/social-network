import { memo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { UsersInfoType } from '@/API/profile-api'
import { useAppDispatch } from '@/redux/redux-store'
import { follow, unfollow } from '@/redux/users-reducer'
import { Avatar, Button, List, Popconfirm } from 'antd'

import s from './user.module.scss'

type UserTypeProps = {
  user: UsersInfoType
}
export const User = memo(({ user }: UserTypeProps) => {
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
              avatar={<Avatar src={`${user.photos.small}`} />}
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

//<NavLink onClick={moveToProfile} to={{}}>

// return (
//
//   )
// })

// <List
//       dataSource={data}
//       itemLayout={'horizontal'}
//       renderItem={(item, index) => (
//         <List.Item>
//           <List.Item.Meta
//             avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
//             description={
//               'Ant Design, a design language for background applications, is refined by Ant UED Team'
//             }
//             title={<a href={'https://ant.design'}>{item.title}</a>}
//           />
//         </List.Item>
//       )}
//     />
//   )

//<div>
//       <span>
//         <div>
//           <NavLink onClick={moveToProfile} to={{}}>
//             <img alt={'avatar'} src={user.photos.small ? user.photos.small : userPhoto} />
//           </NavLink>
//         </div>
//         <div>
//           {user.followed ? (
//             <Popconfirm
//               description={'Are you sure you want to subscribe?'}
//               onConfirm={unfollowUser}
//               title={'Get Exclusive Content Only for Subscribers!'}
//             >
//               {' '}
//               <Button type={'primary'}>Follow</Button>
//             </Popconfirm>
//           ) : (
//             <Popconfirm
//               description={'Are you sure you want to unsubscribe'}
//               onConfirm={followUser}
//               title={"We're sorry that you want to unsubscribe from our updates."}
//             >
//               {' '}
//               <Button>Unfollow</Button>
//             </Popconfirm>
//           )}
//         </div>
//       </span>
//       <span>
//         <span>
//           <div>{user.name}</div>
//           <div>{user.status}</div>
//         </span>
//       </span>
//     </div>
