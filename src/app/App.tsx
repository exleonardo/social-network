import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ChatPage } from '@/components/Chat/ChatPage'
import { Header } from '@/components/Header/Header'
import { Login } from '@/components/Login/Login'
import { getCurrentUserId } from '@/components/Login/login-selectors'
import { Navbar } from '@/components/Navbar/Menu/Navbar'
import ProfileMain from '@/components/Profile/ProfileMain'
import { ResultStatus } from '@/components/Result/ResultStatus'
import { UsersPage } from '@/components/Users/UsersPage'
import { Player } from '@/components/Video/Player'
import { initializeApp } from '@/redux/app-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Layout, theme } from 'antd'

import './App.scss'

import Music from '../components/Music/Music'
import News from '../components/News/News'
import Setting from '../components/Setting/Setting'
import Preloader from '../components/common/Preloader/Preloader'

const { Content, Footer, Sider } = Layout

export const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  const authorizedUserId = useAppSelector(getCurrentUserId)
  const dispatch = useAppDispatch()

  const catchAllUnhandleErrors = () => {
    alert('Some Error')
  }

  useEffect(() => {
    dispatch(initializeApp())
    window.addEventListener('unhandledrejection', catchAllUnhandleErrors)

    return () => {
      window.removeEventListener('unhandledrejection', catchAllUnhandleErrors)
    }
  }, [authorizedUserId])

  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()

  if (!authorizedUserId) {
    return <Preloader />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '1px -2px 19px -1px rgba(34, 60, 80, 0.2)',
            margin: '24px 16px',
            minHeight: 280,
            padding: 24,
          }}
        >
          <Switch>
            <Route exact path={'/'} render={() => <Redirect to={'/profile'} />} />
            <Route path={'/chat'} render={() => <ChatPage />} />
            <Route path={'/profile/:userId?'} render={() => <ProfileMain />} />
            <Route path={'/users'} render={() => <UsersPage />} />
            <Route path={'/login'} render={() => <Login />} />
            <Route path={'/news'} render={() => <News />} />
            <Route path={'/music'} render={() => <Music />} />
            <Route path={'/video'} render={() => <Player />} />
            <Route path={'/setting'} render={() => <Setting />} />
            <Route
              path={'/unautorized'}
              render={() => (
                <ResultStatus
                  buttonTitle={'Login'}
                  status={'403'}
                  subTitle={'Sorry, you are not authorized to access this page.'}
                />
              )}
            />
            <Route
              path={'*'}
              render={() => (
                <ResultStatus
                  buttonTitle={'Back home'}
                  status={'404'}
                  subTitle={'Sorry, the page you visited does not exist.'}
                />
              )}
            />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Alexander Khomenok Design Created ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
