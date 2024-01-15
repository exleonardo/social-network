import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import s from './preloader.module.scss'
type PreloaderType = {
  content?: boolean
  fullscreen: boolean
  position?: 'absolute' | 'fixed' | 'relative'
}
const Preloader = ({ content, fullscreen, position = 'fixed' }: PreloaderType) => {
  return (
    <Spin
      className={content ? s.preloaderContent : s.preloader}
      fullscreen={fullscreen}
      indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
      style={{ position: position }}
    />
  )
}

export default Preloader
