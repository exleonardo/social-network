import { Layout } from 'antd'
const { Footer } = Layout

import s from './footer.module.scss'
export const FooterContent = () => {
  return (
    <Footer className={s.footer}>
      Alexander Khomenok Design Created ©{new Date().getFullYear()}
    </Footer>
  )
}
