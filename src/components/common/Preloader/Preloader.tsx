import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
type PreloaderType = {
  fullscreen: boolean
}
const Preloader = ({ fullscreen }: PreloaderType) => {
  return (
    <Spin
      fullscreen={fullscreen}
      indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
      style={{
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

export default Preloader
