import { NavLink } from 'react-router-dom'

type UserTitleType = {
  moveToProfile: () => void
  userName: string
}
export const UserTitle = ({ moveToProfile, userName }: UserTitleType) => {
  return (
    <NavLink onClick={moveToProfile} to={{}}>
      {userName}
    </NavLink>
  )
}
