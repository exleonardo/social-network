import { Layout } from 'antd'
const { Footer: Footer } = Layout

import s from '../style/index.module.scss'
export const FooterContent = () => {
  return (
    <Footer className={s.footer}>
      Alexander Khomenok Design Created ©{new Date().getFullYear()}
    </Footer>
  )
}
