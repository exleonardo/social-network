import Search from 'antd/es/input/Search'

type FindUserType = {
  onSearch: () => void
}
export const FindUser = ({ onSearch, ...props }: FindUserType) => {
  return (
    <Search
      allowClear
      enterButton={'Search'}
      onSearch={onSearch}
      placeholder={'Find user'}
      size={'large'}
      style={{ width: '300px' }}
      {...props}
    />
  )
}
