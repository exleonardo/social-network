import { EditOutlined } from '@ant-design/icons'

type EditStatusType = {
  className?: string
  onClick: () => void
}
export const EditStatus = ({ className, onClick }: EditStatusType) => {
  return <EditOutlined className={className} onClick={onClick} rev={undefined} />
}
