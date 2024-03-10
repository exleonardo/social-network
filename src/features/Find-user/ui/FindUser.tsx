import Search from 'antd/es/input/Search'
import { clsx } from 'clsx'

import s from '../style/index.module.scss'
type FindUserType = {
  className?: string
  onSearch: () => void
}
export const FindUser = ({ className, onSearch, ...props }: FindUserType) => {
  const classes = clsx(s.findUser, className)

  return (
    <Search
      allowClear
      className={classes}
      enterButton={'Search'}
      onSearch={onSearch}
      placeholder={'Find user'}
      size={'large'}
      {...props}
    />
  )
}
