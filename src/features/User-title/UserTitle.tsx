import { NavLink } from 'react-router-dom'

type UserTitleType = {
  className?: string
  moveToProfile: () => void
  userName: string
}
export const UserTitle = ({ className, moveToProfile, userName }: UserTitleType) => {
  return (
    <NavLink className={className} onClick={moveToProfile} to={{}}>
      {userName}
    </NavLink>
  )
}
