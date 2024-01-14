import { useEffect, useState } from 'react'

import { Header } from '@/components/Header/Header'
import { Navbar } from '@/components/Navbar/Menu/Navbar'
import Preloader from '@/components/common/Preloader/Preloader'
import ContentProfile from '@/components/content/contentProfile'
import { initializeApp } from '@/redux/app-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Layout } from 'antd'

import './app.scss'

const { Footer, Sider } = Layout

export const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const initialized = useAppSelector(state => state.app.initialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return <Preloader fullscreen />
  }

  return (
    <Layout style={{ margin: '0 auto', minHeight: '100vh', width: '70vw' }}>
      <Sider
        className={'menu'}
        collapsed={collapsed}
        collapsedWidth={0}
        collapsible
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ background: '#1d2b43' }}
        trigger={collapsed}
        zeroWidthTriggerStyle={{ display: 'none' }}
      >
        <Navbar />
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentProfile />
        <Footer style={{ paddingBottom: '30px', paddingTop: 0, textAlign: 'center' }}>
          Alexander Khomenok Design Created ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
